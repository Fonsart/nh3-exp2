/* eslint-disable */

import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import './share.css';
import Modal from "react-responsive-modal";

const Share = (props) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.show);
  }, [props.show])

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

        <h2>Partager l'expérience</h2>
        <p>L'expérience vous plaît ? Partagez-la avez vos amis !</p>
        <table className="ack-save">
          <tbody>
            <tr>
              <td><button className="btn btn__modal btn__close" onClick={props.deny}><i className="fas fa-ban"></i></button></td>
              <td><button className="btn btn__modal btn__share" onClick={props.share}><i className="fas fa-external-link-alt"></i></button></td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  )
}

export default Share;
