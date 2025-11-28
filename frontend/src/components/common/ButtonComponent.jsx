import { Loader2 } from "lucide-react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({ 
  loading, 
  children, 
  loadingText, 
  type = "submit",
  className = "",
  disabled = false,
  ...props 
}) => {
  return (
    <Button
      type={type}
      className={`auth-submit-btn ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="spinner-icon me-2" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonComponent;