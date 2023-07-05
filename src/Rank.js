
function Rank({name, entries}){
    return( 
        <div>
            <div className="white f3">
                {`Hi ${name} your total entries are...`}
            </div>
            <div className="white f1">
            {`${entries}`}
        </div>
        </div>
    )
}

export default Rank;