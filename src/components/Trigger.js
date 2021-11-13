import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Trigger.css";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Trigger({tabs}) {
 
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [reaction, setReaction] = useState([]);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("rendered" + tabs)
    setValue(tabs)
 
  }, [tabs])

  useEffect(() => {
    axios
      .get("https://artful-iudex.herokuapp.com/users")
      .then((res) => {
        // console.log(res.data)
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://artful-iudex.herokuapp.com/user_content_reactions")
      .then((res) => {
        // console.log(res.data);
        setReaction(res.data);
        // console.log(users)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
      <Box classNme="appBar">
        <AppBar position="">
          <h3 className="heading">Reactions</h3>
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            onChange={handleChange}
          >
            <Tab
              label="All"
              {...a11yProps(0)}
              onMouseEnter={() => {
                setValue(0);
              }}
            />
            <Tab
              label={"👍 . 5"}
              {...a11yProps(1)}
              // onMouseEnter={() => {
              //   setValue(1);
              // }}
            />
            <Tab
              label={"❤️ . 10"}
              {...a11yProps(2)}
              // onMouseEnter={() => {
              //   setValue(2);
              // }}
            />
            <Tab
              label={"👏 . 15"}
              {...a11yProps(3)}
              // onMouseEnter={() => {
              //   setValue(3);
              // }}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction} className="Tab">
          <List
            dense
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              padding: "0px !important",
            }}
          >
            {users.map((value) => {
              return (
                <ListItem sx={{ padding: "0px" }}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar`} src={value.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${value.first_name} ${value.last_name}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className="Tab">
          Item Two
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          dir={theme.direction}
          className="Tab"
        ></TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction} className="Tab">
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}

export default Trigger;
