import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
    }}
  >
    <ClipLoader
      color="#FF8084"
      loading
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export default Loader;
