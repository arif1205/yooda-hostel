import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: ${(props) => (props.openModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  .show-modal-container {
    background-color: #fff;
    max-width: 600px;
    width: 100%;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
  }
`;