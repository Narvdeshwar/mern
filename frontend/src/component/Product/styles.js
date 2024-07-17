import { makeStyles } from "@mui/styles";

export default makeStyles({
    Card:{
        width : 300,
        height : 450, 
        "&:hover": {
            "box-border":"0 0 5px rgba(15, 15, 15, 0.26)",
             transform: "translateY(-0.6vmax)",
            
        }
    },
    image:{
        width:"100%",
        height: 380
    },
    links:{
        textDecoration: "none",
    }
        
})