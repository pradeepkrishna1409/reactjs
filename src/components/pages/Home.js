import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Visualization from "../components/Visualization";
import MaterialProject from "../components/Material_Project";
import MaterialResource from "../components/Material_Resource";
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmTwoToneIcon from '@material-ui/icons/AccessAlarmTwoTone';
import PollIcon from '@material-ui/icons/Poll';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 500,
      tabHeight : '24px'
    },
    wrapper: {
      flexDirection: 'row'
    }
  });

const Home = props => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [Pagesize, setPagesize] = React.useState(window.localStorage.getItem( 'page_set' ) || 20);
  const [searchTerm, setsearchTerm] = React.useState('dy');
  // let ref = React.createRef();

  // React.useEffect(() => {
  //   if( )
  //   window.localStorage.setItem("page_set", 20);
  //   window.location.reload();
  // });

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };



  return (
    <>
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      backgroundColor="#FDFEFE"
      textColor="primary"
      disableUnderline={true}
      className={classes.wrapper}
    >
      <Tab label={<div><AccessAlarmTwoToneIcon style={{verticalAlign: 'middle'}} /> Add & Assign Project </div>} />
      <Tab label={<div><PersonIcon style={{verticalAlign: 'middle'}} /> Add & Assign Resource </div>} />
      <Tab label={<div><PollIcon style={{verticalAlign: 'middle'}} /> Visualization </div>} />

    </Tabs>
      {selectedTab === 0 && <MaterialProject Pagesize={Pagesize} SetPagesize={setPagesize} searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>}
      {selectedTab === 1 && <MaterialResource Pagesize={Pagesize} SetPagesize={setPagesize} searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>}
      {selectedTab === 2 && <Visualization />}
    </>
  );
};

export default Home;
