import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import "../styles/index.css";

import { Button} from 'react-bootstrap';
export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <html>
 
               <body>
                  <main>
                  <Button href="/locations" variant="primary" size="lg">View Locations</Button>{' '}
                          <br></br><br></br>
                      <article>
                      <div class="d-flex justify-content-center mb-3">
                          <div className = "myTable" id = "myTable">
                              <div className = "myTable-row" id = "myTable-row">
                                  <div id="colorSelector1"></div> 
                                  <div id="colorSelector2"></div>
                                </div>
                            </div>
                            </div>
                        </article>
                    </main>
<br></br><br></br>
</body>
</html>

        )
    }
}