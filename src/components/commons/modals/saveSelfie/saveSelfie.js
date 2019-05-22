/* eslint-disable */

import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import './saveSelfie.css';
import Modal from "react-responsive-modal";

const SaveSelfie = (props) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen((props.open && props.isSelfie));

  }, [props.open])

  const close = () => {
    setOpen(false);
  }

  const save = () => {
    console.log("saving picture nigga");
    
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: "saveOverlay",
          modal: "saveModal"
        }}
      >

        <h2>Sauvegarder la mosaïque ?</h2>
        <table className="ack-save">
          <tbody>
            <tr>
              <td><button className="btn btn__modal btn__close" onClick={close}><i className="fas fa-ban"></i></button></td>
              <td><button className="btn btn__modal btn__agree" onClick={save}><i className="fas fa-check-circle"></i></button></td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  )
}

export default SaveSelfie;
