// An action

export function complete(node, params) {
    const originalBorderColor = node.style.borderColor; 

    const HandleColor = () => {
        if(params) {
            node.style.borderColor = 'green';
        }
        else {
            node.style.borderColor = originalBorderColor
        }
    }

    return  HandleColor();
}