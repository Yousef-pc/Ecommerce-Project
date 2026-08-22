import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router"; // This is specifically for testing and does what BrowserRouter do for us.
import userEvent from '@testing-library/user-event';
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";
import { Location } from "./PaymentSummary";
import { formatMoney } from "../../utils/money";

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    default: {
      ...actual.default, // Keep all real methods
      post: vi.fn() // Only mock post
    }
  };
});

describe('PaymentSummary component', () => {
  let loadCart;
  let mockPaymentSummary;

  beforeEach(async () => {
    loadCart = vi.fn();

    const response = await axios.get('/api/payment-summary');
    mockPaymentSummary = await response.data;
  });

  it('shows payment summary rows correctly', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={mockPaymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    const paymentSummaryTotalItems = screen.getByTestId('payment-summary-total-items');
    const paymentSummaryOfItems = screen.getByTestId('payment-summary-of-items');
    const shippingAndHandling = screen.getByTestId('shipping-and-handling');
    const paymentSummaryBeforeTax = screen.getByTestId('payment-summary-before-tax');
    const estimatedTax = screen.getByTestId('estimated-tax');
    const paymentSummaryTotalCost = screen.getByTestId('payment-summary-total-cost');

    expect(
      paymentSummaryTotalItems
    ).toHaveTextContent(`Items (${mockPaymentSummary.totalItems}):`);
    expect(
      paymentSummaryOfItems
    ).toHaveTextContent(formatMoney(mockPaymentSummary.productCostCents));
    expect(
      shippingAndHandling
    ).toHaveTextContent(formatMoney(mockPaymentSummary.shippingCostCents));

    expect(
      paymentSummaryBeforeTax
    ).toHaveTextContent(formatMoney(mockPaymentSummary.totalCostBeforeTaxCents));

    expect(
      estimatedTax
    ).toHaveTextContent(formatMoney(mockPaymentSummary.taxCents));

    expect(
      paymentSummaryTotalCost
    ).toHaveTextContent(formatMoney(mockPaymentSummary.totalCostCents));
  });

  it('works correctly with Place Your Order button', async () => {

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={mockPaymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter> // We don't need to mock useNavigte since we are use memoryRouter
    );

    const user = userEvent.setup();
    const placeOrderButton = screen.getByTestId('place-order-button-test');
    const locationElement = screen.getByTestId('url-path');

    await user.click(placeOrderButton);

    expect(axios.post)
      .toHaveBeenCalledWith('/api/orders');

    expect(loadCart).toHaveBeenCalled();

    expect(locationElement)
      .toHaveTextContent('/orders');
  });
}); // check how you mocked the axios at the top