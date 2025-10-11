import React, { useState, useEffect } from "react";
import { Box, Typography, Slider } from "@mui/material";
import { motion } from "framer-motion";
import { SliderTriangleAnswer } from "../../types";

interface SliderTriangleQuestionProps {
  value: SliderTriangleAnswer;
  onChange: (value: SliderTriangleAnswer) => void;
}

const TOTAL_POINTS = 200;
const MAX_PER_SLIDER = 100;

export const SliderTriangleQuestion: React.FC<SliderTriangleQuestionProps> = ({
  value,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState<SliderTriangleAnswer>(
    value || { quality: 67, speed: 67, budget: 66 }
  );

  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  const handleSliderChange = (
    slider: keyof SliderTriangleAnswer,
    newValue: number
  ) => {
    const currentTotal =
      localValue.quality + localValue.speed + localValue.budget;
    const otherSliders = (
      Object.keys(localValue) as Array<keyof SliderTriangleAnswer>
    ).filter((key) => key !== slider);

    const currentSliderValue = localValue[slider];
    const delta = newValue - currentSliderValue;

    // Calculate new values
    const newValues = { ...localValue, [slider]: newValue };
    let remainingDelta = delta;

    // Distribute the delta across other sliders
    for (const otherSlider of otherSliders) {
      if (remainingDelta === 0) break;

      const currentOtherValue = localValue[otherSlider];
      const maxDecrease = currentOtherValue; // Can't go below 0
      const maxIncrease = MAX_PER_SLIDER - currentOtherValue; // Can't go above 100

      if (remainingDelta > 0) {
        // Need to decrease this slider
        const decrease = Math.min(remainingDelta, maxDecrease);
        newValues[otherSlider] = currentOtherValue - decrease;
        remainingDelta -= decrease;
      } else {
        // Need to increase this slider
        const increase = Math.min(-remainingDelta, maxIncrease);
        newValues[otherSlider] = currentOtherValue + increase;
        remainingDelta += increase;
      }
    }

    // Ensure total is exactly 200
    const newTotal = newValues.quality + newValues.speed + newValues.budget;
    if (newTotal !== TOTAL_POINTS) {
      // Adjust the first other slider to compensate
      const adjustSlider = otherSliders[0];
      newValues[adjustSlider] += TOTAL_POINTS - newTotal;
    }

    setLocalValue(newValues);
    onChange(newValues);
  };

  const getPercentage = (value: number) => ((value / MAX_PER_SLIDER) * 100).toFixed(0);

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, sm: 5, md: 6 } }}>
          {/* Quality Slider */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.375rem" },
                }}
              >
                Quality
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: "primary.main",
                }}
              >
                {localValue.quality}
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                    color: "text.secondary",
                    ml: 0.5,
                  }}
                >
                  / {MAX_PER_SLIDER}
                </Typography>
              </Typography>
            </Box>
            <Slider
              value={localValue.quality}
              onChange={(_, newValue) =>
                handleSliderChange("quality", newValue as number)
              }
              min={0}
              max={MAX_PER_SLIDER}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": {
                  width: { xs: 20, sm: 24, md: 28 },
                  height: { xs: 20, sm: 24, md: 28 },
                },
                "& .MuiSlider-track": {
                  height: { xs: 6, sm: 8, md: 10 },
                },
                "& .MuiSlider-rail": {
                  height: { xs: 6, sm: 8, md: 10 },
                },
              }}
            />
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                mt: 1,
              }}
            >
              High-quality code, thorough testing, and best practices
            </Typography>
          </Box>

          {/* Speed Slider */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.375rem" },
                }}
              >
                Speed
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: "primary.main",
                }}
              >
                {localValue.speed}
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                    color: "text.secondary",
                    ml: 0.5,
                  }}
                >
                  / {MAX_PER_SLIDER}
                </Typography>
              </Typography>
            </Box>
            <Slider
              value={localValue.speed}
              onChange={(_, newValue) =>
                handleSliderChange("speed", newValue as number)
              }
              min={0}
              max={MAX_PER_SLIDER}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": {
                  width: { xs: 20, sm: 24, md: 28 },
                  height: { xs: 20, sm: 24, md: 28 },
                },
                "& .MuiSlider-track": {
                  height: { xs: 6, sm: 8, md: 10 },
                },
                "& .MuiSlider-rail": {
                  height: { xs: 6, sm: 8, md: 10 },
                },
              }}
            />
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                mt: 1,
              }}
            >
              Fast delivery and quick turnaround time
            </Typography>
          </Box>

          {/* Budget Slider */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.375rem" },
                }}
              >
                Budget
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: "primary.main",
                }}
              >
                {localValue.budget}
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                    color: "text.secondary",
                    ml: 0.5,
                  }}
                >
                  / {MAX_PER_SLIDER}
                </Typography>
              </Typography>
            </Box>
            <Slider
              value={localValue.budget}
              onChange={(_, newValue) =>
                handleSliderChange("budget", newValue as number)
              }
              min={0}
              max={MAX_PER_SLIDER}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": {
                  width: { xs: 20, sm: 24, md: 28 },
                  height: { xs: 20, sm: 24, md: 28 },
                },
                "& .MuiSlider-track": {
                  height: { xs: 6, sm: 8, md: 10 },
                },
                "& .MuiSlider-rail": {
                  height: { xs: 6, sm: 8, md: 10 },
                },
              }}
            />
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                mt: 1,
              }}
            >
              Cost-effective solution within your budget constraints
            </Typography>
          </Box>

          {/* Points Summary */}
          <Box
            sx={{
              mt: { xs: 2, sm: 3, md: 4 },
              p: { xs: 2, sm: 2.5, md: 3 },
              backgroundColor: "grey.100",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              Points Distributed
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                color:
                  localValue.quality + localValue.speed + localValue.budget ===
                  TOTAL_POINTS
                    ? "success.main"
                    : "error.main",
              }}
            >
              {localValue.quality + localValue.speed + localValue.budget} /{" "}
              {TOTAL_POINTS}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};




