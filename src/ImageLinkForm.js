import "./Imagelinkform.css";

function ImageLinkForm(props){
    return( 
        <div>
            <p className="f3">
                {'This Site will detect the face in your image'}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input type='text'className='f4 pa2 w-70 center' onChange={props.onchangeinput}/>
                    <button className="f4, w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={props.onclickbutton}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;