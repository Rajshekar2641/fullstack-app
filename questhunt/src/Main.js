import React, { Component } from "react";
import "./styles/index.css";

class Main extends Component {
    render() {
      return (
          <html>
              <body>
                  <main>
                      <article>
                    <div className = "header" id = "header">
                        <h1>Quest Hunt</h1>
                        <br></br><br></br>
                    </div>
       <div className = "myTable" id = "myTable">
       <div className = "myTable-row" id = "myTable-row">
           <div id="colorSelector1"></div> <!-- Add the logic for locations -->
           <div id="colorSelector2"></div>
       </div>
   </div>
</article>
</main>
<br></br>
</body>
<footer>
<i id = "random" className="fa">&#xf09b;</i> 
<a href="https://github.com/Rajshekar2641/fullstack-app">Source Code on Github</a>
</footer>
</html>

);
}
}
export default Main;
  

  
