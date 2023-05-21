import React from "react";
import FooterImage from "../imgs/Footer-Artwork.jpg"

function Footer() {
    return (
      <footer style={styles.footerStyle}>
        <div style={styles.divStyle}>
          <span style={{ padding: '0 10px' }}>© 2023 My App, Inc.</span>
        </div>
      </footer>
    );
  }
  
  export default Footer;

const styles = {
  divStyle: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    
  },
  footerStyle:{
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: '#333',
    color: '#fff',
    width: '100%',
    padding: 20,
    zIndex: 1,
    backgroundImage: `url(${FooterImage})`, 
    backgroundPosition: 'center', 
    backgroundRepeat: 'repeat', 
    backgroundSize: 'contain',
  }

}