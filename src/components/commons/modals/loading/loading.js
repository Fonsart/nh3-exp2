/* eslint-disable */

import React, { useState, useEffect } from "react";
import { css } from '@emotion/core';
import './loading.css';
import Modal from "react-responsive-modal";
import { GridLoader } from "react-spinners";

const override = css`
    display: block;
    margin: 0 auto;
    width:80%;
    border-color: red;
`;

const Loading = (props) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.loading);
  }, [props.loading])

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        closeOnEsc={false}
        closeOnOverlayClick={false}
        showCloseIcon={false}
        focusTrapped={false}
        classNames={{
          overlay: "loadingOverlay",
          modal:"loadingModal"
        }}
      >
        <GridLoader
          css={override}
          loading={true}
          color={'#fff'}
        />

      </Modal>
    </div>
  )
}

export default Loading;
