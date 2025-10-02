import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({ open, onClose, imageSrc, imageAlt }: ImageModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          boxShadow: "none",
          borderRadius: 0,
          maxWidth: "95vw",
          maxHeight: "95vh",
          width: "auto",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{
            maxWidth: "100%",
            maxHeight: "95vh",
            height: "auto",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
