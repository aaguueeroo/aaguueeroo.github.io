import React, { useCallback, useEffect, useState } from "react";
import { Alert, Box, Grid2 as Grid, Snackbar } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SavingsIcon from "@mui/icons-material/Savings";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { motion } from "framer-motion";
import { InteractiveOptionCardLayout } from "../common/InteractiveOptionCardLayout";
import { cardStagger } from "../../utils/animations";
import { SliderTriangleAnswer } from "../../types";

interface SliderTriangleQuestionProps {
  value: SliderTriangleAnswer;
  onChange: (value: SliderTriangleAnswer) => void;
}

type SliderTriangleOptionId = "quality" | "speed" | "budget";

interface SliderTriangleOption {
  readonly id: SliderTriangleOptionId;
  readonly label: string;
  readonly description: string;
  readonly icon: React.ElementType;
  readonly selectedIcon: React.ElementType;
}

const sliderTriangleOptions: readonly SliderTriangleOption[] = [
  {
    id: "quality",
    label: "Quality",
    description: "High-quality code, thorough testing, and best practices",
    icon: StarBorderIcon,
    selectedIcon: AutoAwesomeIcon,
  },
  {
    id: "speed",
    label: "Speed",
    description: "Fast delivery and quick turnaround time",
    icon: BoltOutlinedIcon,
    selectedIcon: BoltIcon,
  },
  {
    id: "budget",
    label: "Budget",
    description: "Cost-effective solution within your budget constraints",
    icon: LocalAtmIcon,
    selectedIcon: SavingsIcon,
  },
] as const;

const areValuesEqual = (
  first: SliderTriangleAnswer,
  second: SliderTriangleAnswer
): boolean => {
  if (first.length !== second.length) {
    return false;
  }
  const firstSorted = [...first].sort();
  const secondSorted = [...second].sort();
  return firstSorted.every((value, index) => value === secondSorted[index]);
};

export const SliderTriangleQuestion: React.FC<SliderTriangleQuestionProps> = ({
  value,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<SliderTriangleAnswer>(
    () => (value ? [...value] : [])
  );
  const [showLimitToast, setShowLimitToast] = useState<boolean>(false);

  useEffect(() => {
    if (!value) {
      if (selectedValues.length > 0) {
        setSelectedValues([]);
      }
      return;
    }
    if (!areValuesEqual(value, selectedValues)) {
      setSelectedValues([...value]);
    }
  }, [value, selectedValues]);

  const handleOptionSelect = useCallback(
    (optionId: SliderTriangleOptionId) => {
      const isAlreadySelected = selectedValues.includes(optionId);

      if (isAlreadySelected) {
        const updatedValues = selectedValues.filter(
          (valueId) => valueId !== optionId
        );
        setSelectedValues(updatedValues);
        onChange(updatedValues);
        return;
      }

      if (selectedValues.length >= 2) {
        setShowLimitToast(true);
        return;
      }

      const updatedValues = [...selectedValues, optionId];
      setSelectedValues(updatedValues);
      onChange(updatedValues);
    },
    [onChange, selectedValues]
  );

  const handleToastClose = useCallback(() => {
    setShowLimitToast(false);
  }, []);

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <motion.div
        variants={cardStagger.container}
        initial="initial"
        animate="animate"
      >
        <Grid container justifyContent="space-between" spacing={4}>
          {sliderTriangleOptions.map((option) => {
            const IconComponent = option.icon;
            const SelectedIconComponent = option.selectedIcon;
            const isSelected = selectedValues.includes(option.id);

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={option.id}
                sx={{ display: "flex" }}
              >
                <motion.div
                  variants={cardStagger.item}
                  style={{ display: "flex" }}
                >
                  <InteractiveOptionCardLayout
                    ariaLabel={`${option.label}: ${option.description}`}
                    isSelected={isSelected}
                    onSelect={() => handleOptionSelect(option.id)}
                    slots={{
                      renderIcon: ({ isSelected: selected }) =>
                        selected ? (
                          <SelectedIconComponent
                            sx={{
                              fontSize: { xs: 24, sm: 28, md: 34 },
                              color: "primary.contrastText",
                              transition: "all 0.3s ease",
                            }}
                          />
                        ) : (
                          <IconComponent
                            sx={{
                              fontSize: { xs: 24, sm: 28, md: 34 },
                              color: "primary.main",
                              transition: "all 0.3s ease",
                            }}
                          />
                        ),
                      renderTitle: () => option.label,
                      renderDescription: () => option.description,
                    }}
                  />
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>

      <Snackbar
        open={showLimitToast}
        autoHideDuration={3200}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: "50% !important", transform: "translateY(-50%)" }}
      >
        <Alert
          onClose={handleToastClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          You can’t have everything in this life. Pick the two that matter most.
        </Alert>
      </Snackbar>
    </Box>
  );
};
