import React from "react";

export const KuaiJieJian = (props:{x:string,y:string,kuaijiejian:string}) => {
    return <Panel style={{x:props.x,y:props.y,}} className = {"kjj2"}><Label text={props.kuaijiejian} className = {"kjj1"}/></Panel>
}
