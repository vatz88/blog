<!--json
{
  "title": "Components With Async Friendly Event Handlers",
  "description": "What are async event handlers, why they are amazing and how you can start using them right away - Blog | Vatsal Joshi",
  "meta": [
    {
      "name": "keywords",
      "content": "React,Async,Button,EventHandler,Promises,Components,Blog,Vatsal,Joshi,vatz88"
    }
  ],
  "date": "2021-05-26",
  "page_identifier": "blog004"
}
-->

# Components With Async Friendly Event Handlers

Posted on May 26, 2021

---

All apps have to listen to user input, it could be a button click or some text being typed in an input box. These user actions in return perform a task like api call, validating the input, etc. These actions can be asynchronous in nature and it's in these cases where having async event handlers is quite beneficial.

Let's take a simple example of a button. On clicking the button, we'll make an api call and then render an image from the api's response. I'll be using React here but these ideas remain same for other frameworks too.

<!-- Sync onClick handler -->
<iframe src="https://codesandbox.io/embed/sync-onclick-handler-tqw54?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Sync onClick handler"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

As you can try in the above example it works perfectly well. But what if it's an expensive api call (time consuming) or if the user is on a bad network? There are a few issues with this scenario. Let's look at them one by one:

<!-- Sync handler with delayed api response -->
<iframe src="https://codesandbox.io/embed/sync-handler-with-delayed-response-6c18h?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Sync handler with delayed response"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

- Now if you click the button, there's no immediate feedback to the user. User may feel like it's not working. Only to eventually find out that the result is loaded after 4s.

- In this 4s time gap, the user may just click the button again thinking it was not clicked the first time 🤦‍♂️. This leads to unnecessary api calls. Also, it may render the results twice, once for each response from the api call. This is based on the implementation but it could lead us to handling more edge cases.

## Writing Components With Async Event Handler

Let's look at the same example but this time implemented with async onClick handler.

<iframe src="https://codesandbox.io/embed/async-onclick-handler-1fpb3?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FButton.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Async onClick handler"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

What did we change? We made the `onClick` function passed to button `async function` which resolves after the response from the api call. We also added a `Button` component which has it's own internal state which enables the button or shows the 'loading' state. The `Button` component can internally change this state based on when it's clicked and when the `onClick` handler resolves.

### Benefits Of Using Async Event Handler

- Users get a visual feedback on the action of click.

- The state of `Button` component is internally handled by the component. A traditional approach to solve this has been to pass a `isDisabled` prop to the `Button` component. But why would we want to add logic to enable/disable button for each button we use in our app when the component itself can take care of it?

- Some apps show a full screen spinner to indicate that they are fetching data from api. It works but again, don't we end up writing the logic to toggle the spinner on button click? Additionally, why hide the existing content until we're fetching new one? Inputs with async handler can manage their state (loaded/loading) internally and have this UX advantage that they don't end up changing any of the existing content on page and still communicate to the user that new data is being fetched. Wouldn't it be nice to have the meaningful content on the page for user's reference than show a spinner? In some cases, may be yes.

Here we considered a button component but, this same logic can be extending to all forms of input components.

Imagine you have a input box with some async validations. How nice it'd be, if the input component can update it's state (show user the validation error) based on whether the async `onChange` is resolved or rejected. We can even reject it with the custom validation error message for input component to show!

### Adding Compatibility For Sync OnClick Handlers

We may still want to use the `Button` component for non-async tasks. One way is to convert all your functions to async function by simple using the `async` keyword.

```js
async function asyncFunctionDoingSyncTask() {
	// some synchronous code here
}
```

Another way is to modify our `Button` component to accept both kinds of `onClick` handler functions - sync and async. We can do this simply by wrapping the response of `onClick` handler in `Promise.resolve`. This will return a promise if the onClick handler was not an async function. Doesn't matter if it's already returning a `Promise`.

```js
// set Button state to 'loading'
let response = onClickHandler();
response = Promise.resolve(response);
await response;
// set Button state to 'done'
```

Some may argue that this will make a synchronous code execute in an asynchronous way as we make use of Promise which will add execution after `await` to microtask queue. You may use `instanceof` to determine if the return value of the `onClick` handler is a `Promise` or not.

```js
const response = onClickHandler();
if (response instanceof Promise) {
	response.then(() => {
		// set Button state to done
	});
} else {
	// set Button state to done
}
```

Hope you found it helpful! Let's write more components with async friendly event handler :)
