/* eslint-disable */

import React, { useState, useEffect} from "react";
import { CSSTransition } from "react-transition-group";
import './saveSelfie.css';
import Modal from "react-responsive-modal";

const SaveSelfie = (props) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {    
        setOpen((props.open && props.isSelfie));
        
    },[props.open])

    return (
      <div>  
        <Modal 
            open={open} 
            onClose={() => setOpen(false)} 
            center
            classNames={{
                overlay: "saveOverlay",
                modal:"saveModal"
              }}
            >

          <h2>Sauvegarder</h2>
          <p>
            Voulez-vous sauvegarder votre mosaïque ? 
          </p>
        </Modal>
      </div>
    )
}

export default SaveSelfie;
