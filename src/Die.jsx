import React from "react";

export default function Die(props) {
    return (
        <div
            className={props.isHeld ? "die held" : "die"}
            style={props.theme && props.isHeld ? { backgroundColor: "#a61c6e" } : {}}
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}
