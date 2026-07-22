# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




My own notes for learning React:
        /* 
        <ChatInput></ChatInput>  // Component Syntax
        // component syntaxes are like our self-made html elements.

        <></>  // This is called fragment
        // Which helps us group elements togheter, without creating extra divs.

        // Components like ChatMessage are designed to be reusable

        const message = props.message;
        const sender = props.sender;
        // Instead, we can do a shortcut called Destructuring.
        const { message, sender } = props;
        // An even shorter shorcut would be to get the object of variable names we're looking for directly instead of the props param:
        function ChatMessage({ message, sender }) {...}

        {sender === "robot" && <img src="robot.png" width="50" />}
        // Here we cannot use if statement. So we use a method called Guard Operating by using &&. If the value on the left side is correct, the right side code would be inserted onto {}.

        // So one thing that we have learned till now is that we can have components inside the component. So this helps us split a website into smaller and saller components (pieces).

        // If we insert an array of components, react will insert each of the compnents inside our array.
        // when we use .map to change the values of an array and then using them as our components, we have a shortcut which is that we dont save it inside a variable, instead we just paste the code into our app where it is returning our components:
        const chatMessagesComponents = chatMessages.map((chatMessage) => {
            return (
            <ChatMessage 
                message={chatMessage.message}
                sender={chatMessage.sender}
            />
            );
        });

        {chatMessagesComponents}
        // Intead, were gonna just use this:
        {chatMessages.map((chatMessage) => {
            return (
            <ChatMessage 
                message={chatMessage.message}
                sender={chatMessage.sender}
            />
            );
        })}


        // In React, if we're using an array to insert our components, we should give a key to each one of our compoents. Keys help React track changes in the array.

        // It is the best practice to group related components inside a fragment like:
        return (
            <>
            {chatMessages.map((chatMessage) => {
                return (
                <ChatMessage 
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    key={chatMessage.id}
                />
                );
            })}
            </>
        ); // Even though when we use our App components, we're puting all of the components inside a parent fragment.

        // Event Handlers let us run a function when we interact with the website.
        // We use onClick={} for an element so when we clicl on it, it runs a function. We use {} because they can save any type of value in a prop (including functions)
        // onClick is known as the event, and the {sendMEssage} is known as the Event Handler. The Event prop always starts with the word 'on', and it should be written in camelCase.

        // State is data that is connected to the HTML. WHen we update this data, it will update the HTML.
        const array = React.useState(...);
        const chatMessages = array[0]; // In React we should not update the data directly.
        const setChatMessages = array[1]; // We should always use this function to update the data. Because this function tells the React to update the HTML whenever we update the data using this. By the way, the naming convintion for these funcions is to start with (set) and use the camelCase. This function is known as the Updater Function.
        // If we update the data without using the state function, React won't update the HTML.
        // We have a shortcut called Array Destructuring, so instead of:
        const chatMessages = array[0];
        const setChatMessages = array[1];
        // We write:
        const [chatMessages, setChatMessages] = array; // As a result, the first value of the array is gonna be for chatMessages, and the second value of the array is gonna be for setChatMessages.
        // We also have an even shorter shortcut which is that isntead of:
        const array = React.useState(...);
        const [chatMessages, setChatMessages] = array;
        // We write:
        const [chatMessages, setChatMessages] = React.useState(...); // We just give the two variables that we want to get the first and second value of the array directly without saving it into an array.

        // onChange={} runs a function when we change the text inside an input element.
        // This also gives us a param for our function called (event), so that use it to get our element using (event.target). So we can access the input without using the DOM manually (that it may interrupt React), by getting the element from React.
        // In React we should use State to save data that changes over time.

        // We have a technique called (Lifting the Sate Up), which lets us share state between multiple components using our msin App component as the Main root.

        // We have a method called Controled Input. For example, after sending a message, the input should become empty. What we can do for this is to run the state function for our input (setInputText) inside the send message function after the code that adds the message to the page, and then use value={inputText} prop for our input so that the state function can update it.

        // State does not update immediatly. State is updated after all of our code is finished.

        // A Ternary Operator lets us have an if-else statement inside JSX.

        // Hooks lets us insert React features to our components. useState is a React Hook that automatically updates the HTMl when the data is updated.
        // Every Hook starts with the word (use). Such as: useState(), useEffect(), useRef() and more... .
        // useEffect lets us run some code after the component is created or updated.
        // Note: in React we should always put our Hooks at the top of our components and not inside anything.

        React.useEffect(() => {
            console.log("updated");
        }, [chatMessages]);
        // The second param here causes the function only to be ran whenever the chatMEssages is changed.
        // [chatMessages] is called a Dependency Array here. The best practice is to use Dependency Array to avoid running too often (only run when chatMessages changes).

        // useRef lets us automatically save an element from our component.
        // So useRef() creates a (ref). A ref is a container with special React features.
        const chatMessagesRef = React.useRef(null);

        React.useEffect(() => {
            const containerElem = chatMessagesRef.current;
            if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
            }
        }, [chatMessages]);

        return (
            <div className="chat-messages-container" ref={chatMessagesRef}>
            ...
            </div>

        // This is an exaple of how it can be used. So t the beginning when we are sving it, we give it a value (null for this example), then we use a prop called (ref) and give it the name of our variable. and then we use the variable name and accesss the element using .current. and then we can apply changes to our element.

        In this lesson(4):
        1 CSS with React
        2 Styled the Chatbot Project
        3 Flexbox = create a flexible layout
        4 Ternary Operator (?:) = if-else statement directly in the JSX
        5 hooks = insert React features into a component
        6 useEffect = run code after component is created or updated
        7 useRef = save an HTML element from the component
        8 Created the auto-scroll feature

        =======================================================
        ======================================================= Next Lesson (5):
        =======================================================
        // A directory is another name for folder.
        // We have commands such as: {mkdir} or {pwd} (print working directory) or {ls} (list) or {cd} (change directory)
        // After installing node.js, we have a specific name in our terminal called (node).
        // By installing node.js, we also have another feature called (npm) which stands for node pakage manager.
        // A package is basically an external library.
        // node.js lets us install external libraries (or packages) into our project.

        // Now there are packages that give us a specific name to use in our terminal. So we first download them using npm, and then call them
        // For this scenario we can use {npx} (the x means execute) which does both.
        // When we use @ at the end of th package name we are installing, we are saying that we wanna install a specific version of that package.
        // The create-vite command (after installing its package), helps us set up a new React projet.

        1. Proper React Setup (using command line, npm, and Vite)
        2. Command Line = give commands to our computer
        3. NPM = download and use external libraries (or packages)
        4. create-vite Package = helps us create a Proper React Setup
        5. Moved our Chatbot Project into the new React Setup
        6. ESLint = highlights problems in our JavaScript code
        7. JavaScript Modules = separate our code into different files
        8. Separated each component into its own .jsx and .css files

        =======================================================
        ======================================================= Next Lesson (6):
        =======================================================

        */