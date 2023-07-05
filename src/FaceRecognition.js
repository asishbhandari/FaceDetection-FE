import React from "react";
import "./FaceRecognition.css";
function FaceRecognition({ImageUrl, box}){
    return( 
        <div className="center ma">
            <div className="absolute mt2">
                <img id="faceloca" width={"700px"} height={"auto"} alt="" src={ImageUrl}/>
                {/* {console.log(box)} */}
                {   box.map((item,i) => {
                    return (<div key={i} className="border" style={{top: item.toprow, bottom: item.bottomrow, left: item.leftcol, right: item.rightcol }}></div>)
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;
// <div className="border" style={{top: "60px", bottom: "150px", left: "200px", right: "150px" }}></div>