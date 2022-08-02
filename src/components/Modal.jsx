import { useRef } from "react"; //para vincular con la animación, cuando termine de correr, lo vamos a eliminar en vez de ocultarlo con un booleano. Referenciamos la capa blanca del modal porque queremos que se anime mientras el fondo permanece oscuro hasta el final.

export default function Modal({ root, title, children }) {
  const ref = useRef(null);

  function cb() {
    document.querySelector("#modalWrapper").remove();
    root.unmount();
  }
  function handleCloseModal() {
    ref.current.classList.add("fadeOut");
    ref.current.addEventListener("animationend", cb);
    //no solo eliminamos la capa del modal, sino el listener...
  }
  return (
    <div className="modalContainer">
      <div ref={ref} className="modal">
        <header className="modalHeader">{title}</header>
        <div>{children}</div>
        <button onClick={handleCloseModal}>Unmount Modal</button>
      </div>
    </div>
  );
}