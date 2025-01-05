/*
Header component
  -css for the header text, bold for the text, align text with logo, colour match logo and text
Background component
- css for image placement
Main body component.
  -css for the Title: bold, padding, text-align left
  -css for the unordered list: padding between list items, font, colour of bullets
*/
//////////////////////////////
/*
<div.container>
  <header>
    <nav>
      <img />
      <span></span>
    </nav>
  </header>

  <main>
    <h1>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>     

        
      </ul>
    </h1>
  </main>
</div.container>

*/

/*
import {createRoot} from "react-dom/client"
/**
 * Challenge:
 * 
 * - Create an App component in a separate file.
 *   Import it here and render it
 * - Create a "components" folder and a Header component.
 *   Render the Header inside the App component.
 * - Follow the Travel Journal design to build the Header
 *   for our page.
 */
/*
const root = createRoot(document.getElementById("root"))
root.render(/* Render App component here*/




/**
 * Challenge: Build out the Entry component and render 1 instance of it
 * to the App
 * 
 * For now, just hard-code in the data, which you can find in
 * japan.md so you don't have to type it all out manually :)
 * 
 * Notes:
 * – Only render 1 instance of this Entry component for now
 * – I've pulled in marker.png for the little map marker icon
 *   that goes next to the location name
 * – The main purpose of this challenge is to show you where our limitations
 *   currently are, so don't worry about the fact that you're hard-coding all
 *   this data into the component.
 */

//<input> in html displays an imput box
import ReactDOM from 'react-dom/client';
/*
<h1>It is currently sbout {new Date().getHours()}</h1>
//.getHours() returns the hour in 24hr clock. since it is 7:45pm it will retrun 19
//{new Date().getHours()%12} will display hours in 12 hr clock so 7pm
*/
function App() {
const hours = new Date().getHours()

let timeOfDay

if (hours <12){
  timeOfDay = "morning"
}else if (hours >=12 && hours <17){
  timeOfDay = "afternoon"
}else if (hours < 21) {
  timeOfDay = "evening"
}else {
  timeOfDay = "night"
}
  
  return (
    <h1> Good {timeOfDay} </h1>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);