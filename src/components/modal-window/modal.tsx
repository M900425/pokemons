import './modal.scss';

interface ModalProps {
  isOpen: boolean;
  searchBy: "number" | "name";
  setSearchBy: (value: "number" | "name") => void;
}

function Modal({ isOpen, searchBy, setSearchBy }: ModalProps) {
  return (
    <div className={`modal-window ${isOpen ? 'is-open' : ''}`}>
      <h2>Search by:</h2>
      <form>
        <label>
          <input 
            type="radio" 
            name="searchBy" 
            value="number" 
            checked={searchBy === "number"}
            onChange={() => setSearchBy("number")}
          />
          <span>Number</span>
        </label>
        <label>
          <input 
            type="radio" 
            name="searchBy" 
            value="name" 
            checked={searchBy === "name"}
            onChange={() => setSearchBy("name")}
          />
          <span>Name</span>
        </label>
      </form>
    </div>
  );
}

export default Modal;