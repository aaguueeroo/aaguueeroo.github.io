import { Button, ButtonProps, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { keyframes } from "@mui/system";
import { Box } from "@mui/material";

const bounce = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(8px); }
  100% { transform: translateX(0); }
`;

interface PrimaryButtonProps extends ButtonProps {
  showArrow?: boolean;
}

const PrimaryButton = ({ children, showArrow = true, ...props }: PrimaryButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="secondary"
      endIcon={
        showArrow ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            height: '100%',
            marginTop: '-2px'
          }}>
            <ArrowForwardIcon 
              color="primary" 
              sx={{ 
                fontSize: 32,
                width: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
                '.MuiButton-root:hover &': {
                  color: theme.palette.secondary.main,
                  animation: `${bounce} 1s ease-in-out infinite`,
                }
              }} 
            />
          </Box>
        ) : null
      }
      sx={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: theme.spacing(2, 12),
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
        "&:hover": {
          boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
          transform: 'scale(1.05)',
          bgcolor: theme.palette.primary.main,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
