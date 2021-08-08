export const functions =()=>{

const agregarLoginBarra =()=>{
    const d = document;
    const loginInfo = d.querySelector(".login-info")
    
    const barraHeader = d.querySelector(".barra")
    const enlacesMenu = d.querySelector(".enlaces")
    
    if (window.innerWidth > 1024) {
        barraHeader.appendChild(loginInfo)
    } else  {
        enlacesMenu.appendChild(loginInfo)
    }
    
    window.addEventListener("resize", function (event) {
        if (window.innerWidth > 1024) {
            barraHeader.appendChild(loginInfo)
        } else  {
            enlacesMenu.appendChild(loginInfo)
        }
    })
}    

agregarLoginBarra()
}
