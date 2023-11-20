
const PageChangeButton = () => {
    // Define a function to handle button click events
    const handleClick = () => {
      // Perform any additional actions before changing the page
  
      // Example: Redirect to the "/new-page" route
      window.location.href = '/new-page';
    };
  
    // Render the component with a button that changes the page on click
    return (
      <button onClick={handleClick}>
        Change Page
      </button>
    );
  };
  
  export default PageChangeButton;