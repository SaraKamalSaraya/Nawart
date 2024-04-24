
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const  TruncatedText = ({ text }: { text: string | null }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-top">{text}</Tooltip>}
    >
      <div className="text-truncate" style={{ maxWidth: '100px' }}>
        {text}
      </div>
    </OverlayTrigger>
  );
};

export default TruncatedText