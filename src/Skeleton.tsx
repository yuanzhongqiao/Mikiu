import React, { useState } from "react"
import { List, ListItem, ListItemText, Collapse, IconButton, Slider, Typography, ListItemButton } from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"


const categories = {
  Body: ["center", "neck", "head", "upperBody", "lowerBody"],
  Legs: ["leftLeg", "rightLeg", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftFootIK", "rightFootIK"],
  Arms: ["leftForearm", "rightForearm", "leftElbow", "rightElbow", "leftWrist", "rightWrist"],
  Eyes: ["leftEye", "rightEye"],
  Fingers: [
    "rightThumb1",
    "rightThumb2",
    "rightIndex1",
    "rightIndex2",
    "rightIndex3",
    "rightMiddle1",
    "rightMiddle2",
    "rightMiddle3",
    "rightRing1",
    "rightRing2",
    "rightRing3",
    "rightPinky1",
    "rightPinky2",
    "rightPinky3",
    "leftThumb1",
    "leftThumb2",
    "leftIndex1",
    "leftIndex2",
    "leftIndex3",
    "leftMiddle1",
    "leftMiddle2",
    "leftMiddle3",
    "leftRing1",
    "leftRing2",
    "leftRing3",
    "leftPinky1",
    "leftPinky2",
    "leftPinky3",
  ],
}

function Skeleton({
  setBoneRotation,
}: {
  setBoneRotation: (boneRotation: { name: string; axis: string; value: number }) => void
}): JSX.Element {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openBones, setOpenBones] = useState<Record<string, boolean>>({})

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category))
  }

  const toggleBone = (bone: string) => {
    setOpenBones((prev) => ({ ...prev, [bone]: !prev[bone] }))
  }

  return (
    <List className="skeleton" dense>
      {Object.entries(categories).map(([category, bones]) => (
        <React.Fragment key={category}>
          <ListItemButton onClick={() => toggleCategory(category)}>
            <ListItemText primary={category} />
            <IconButton edge="end">
              {openCategory === category ? (
                <ExpandLess sx={{ color: "white" }} />
              ) : (
                <ExpandMore sx={{ color: "white" }} />
              )}
            </IconButton>
          </ListItemButton>
          <Collapse in={openCategory === category} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              {bones.map((boneName) => {
                const bone = importantBones.find((b) => b.name_en === boneName)
                return bone ? (
                  <React.Fragment key={bone.name_en}>
                    <ListItemButton onClick={() => toggleBone(bone.name_en)} sx={{ pl: 4 }}>
                      <ListItemText primary={`${bone.name_en}`} />
                      <IconButton edge="end">
                        {openBones[bone.name_en] ? (
                          <ExpandLess sx={{ color: "white" }} />
                        ) : (
                          <ExpandMore sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    </ListItemButton>
                    <Collapse in={openBones[bone.name_en]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding dense>
                        {["x", "y", "z"].map((axis) => (
                          <ListItem key={`${bone.name_en}-${axis}`} sx={{ pl: 6 }}>
                            <Typography variant="body2" style={{ minWidth: "20px" }}>
                              {axis}:
                            </Typography>
                            <Slider
                              size="small"
                              defaultValue={0}
                              onChange={(_, newValue) => {
                                setBoneRotation({
                                  name: bone.name_jp,
                                  axis: axis,
                                  value: newValue as number,
                                })
                              }}
                              aria-label={`${axis} axis`}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${((value * 180) / Math.PI).toFixed(0)}°`}
                              step={0.001}
                              min={-Math.PI}
                              max={Math.PI}
                              sx={{ ml: 2, width: "80%", color: "#a2c9f5" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ) : null
              })}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  )
}

export default Skeleton
