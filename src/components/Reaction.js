import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import Tooltip from "@mui/material/Tooltip";
import "@fortawesome/fontawesome-free/css/all.min.css";
import IconButton from "@mui/material/IconButton";
import "./Reaction.css";
import Trigger from "./Trigger";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: "0px 20px",
    position: "relative",
    bottom: 3,
  },
}));

function Reaction() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chipData, setChipData] = React.useState([]);
  const [active, setActive] = React.useState("");
  const [tabs,setTabs]=React.useState(0)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdd = (e) => {
    setActive(e.target.className);
    if (e.target.className === "like") {
      const found = chipData.find(function (post, index) {
        if (post.key == "like") return true;
      });
      if (found) {
        const filter = chipData.filter((val, index) => {
          return val.key !== e.target.className;
        });
        setChipData(filter);
      } else {
        setChipData((prevState) => [
          ...prevState,
          {
            key: "like",
            label: `${String.fromCodePoint("0x1f44d")} `,
            count: 1,
          },
        ]);
      }
    }
    if (e.target.className === "love") {
      const found = chipData.find(function (post, index) {
        if (post.key == "love") return true;
      });
      if (found) {
        const filter = chipData.filter((val, index) => {
          return val.key !== e.target.className;
        });

        setChipData(filter);
      } else {
        setChipData((prevState) => [
          ...prevState,
          {
            key: "love",
            label: `${String.fromCodePoint("0x1f497")} `,
            count: 1,
          },
        ]);
      }
    }
    if (e.target.className === "celebrate") {
      const found = chipData.find(function (post, index) {
        if (post.key == "celebrate") return true;
      });
      if (found) {
        const filter = chipData.filter((val, index) => {
          return val.key !== e.target.className;
        });
        setChipData(filter);
      } else {
        setChipData((prevState) => [
          ...prevState,
          {
            key: "celebrate",
            label: `${String.fromCodePoint("0x1f44f")} `,
            count: 1,
          },
        ]);
      }
    }
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    const filter = chipData.filter((val, index) => {
      return val.key !== id;
    });
    setChipData(filter);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
console.log(tabs)
  return (
    <>
      <Popover
        id={id}
        open={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disablePortal={true}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <div className="icons">
            <Tooltip title="Like" placement="top" onMouseEnter={()=>{setTabs(1)}}>
              <span
                role="img"
                aria-label="a"
                className="like"
                onClick={handleAdd}
                defaultValue="like"
              >
                {String.fromCodePoint("0x1f44d")}
              </span>
            </Tooltip>
            <Tooltip title="Love" placement="top" onMouseEnter={()=>{setTabs(2)}}>
              <span
                role="img"
                aria-label="a"
                className="love"
                onClick={handleAdd}
              >
                {String.fromCodePoint("0x2764")}
              </span>
            </Tooltip>
            <Tooltip title="Celebrate" placement="top" onMouseEnter={()=>{setTabs(3)}}>
              <span
                role="img"
                aria-label="a"
                className="celebrate"
                onClick={handleAdd}
              >
                {String.fromCodePoint("0x1f44f")}
              </span>
            </Tooltip>
          </div>
        </Typography>
      </Popover>
      <div classNme="blocks">
        {chipData.map((val, index) => {
          return (
            <Chip
              label={`${val.label} : ${val.count}`}
              color="primary"
              variant={active === val.key ? "outlined" : "inactive"}
              className={active === val.key ? "active" : "inactive"}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(val.key)}
            />
          );
        })}
        <IconButton className="addReactions" onClick={handleClick}>
          <AddReactionOutlinedIcon
            style={{ cursor: "pointer" }}
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
          />
        </IconButton>
      </div>
      <Trigger tabs={tabs} />
    </>
  );
}

export default Reaction;
