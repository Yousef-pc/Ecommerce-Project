import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import axios from "axios";
import { Product } from "./Product";

vi.mock('axios'); // This mock the whole npm pakage, so whenever we use that from this file, it will use this fake version of the package.

// Here we are doing integrated tests rather than unit tests.

describe('Product component', () => {
  it('displays the products correctly', () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    }

    const loadCart = vi.fn(); // This fake function is called a mock.

    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      screen.getByText('$10.90')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('product-image')
    ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(
      screen.getByTestId('product-rating-stars-image')
    ).toHaveAttribute('src', `images/ratings/rating-${product.rating.stars * 10}.png`);

    expect(
      screen.getByText('87')
    ).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    }

    const loadCart = vi.fn(); // This fake function is called a mock.

    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton); // Clicking the button using this method takes some time. So this is an asynchronous code.

    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
      }
    );

    expect(loadCart).toHaveBeenCalled(); // So this test and the above test are User Interaction Tests.
  })
});