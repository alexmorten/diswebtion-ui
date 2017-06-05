import React ,{ Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class VoteDialog extends Component{
  state={
    dialogOpen:false,
    title:"",
    description:"",
    value:0,
    condition_index:0
  }
  handleDialogOpen = ()=>{
    this.setState({dialogOpen:true})
  }
  handleDialogClose = ()=>{
    this.setState({dialogOpen:false});
  }
  handleDialogSubmit = ()=>{
    var newItem={
      title:this.state.title,
      description:this.state.description,
      value:this.state.value,
      condition_id:this.props.conditions[this.state.condition_index]
    };
    this.props.add(newItem);
    this.setState({
      dialogOpen:false,
      title:"",
      description:""
    });
  }
  handleTitleChange = (e)=>{
    //e.preventDefault();
    this.setState({title:e.target.value});
  }
  handleDescriptionChange = (e)=>{
  //  e.preventDefault();
    this.setState({description:e.target.value});
  }
  handleValueChange = (e,value)=>{
    e.preventDefault();

    this.setState({value:value});
  }
  handleConditionChange = (e,value)=>{
    console.log(value);
    this.setState({condition_index:value})
  }
  submitButtonDisabled = ()=>{
    return !(this.state.title.length>0 && this.state.description.length>0) ;
  }
  selectionRenderer = (values) => {
    console.log(values);
    console.log(this.state.condition.title);
    return this.state.condition.title;
}

  render(){
    var color="";
    if (this.state.value > 0) {
      color="#00da00";
    }else if (this.state.value === 0) {
      color="steelblue";
    }else{
      color="red";
    }
    const muiTheme = getMuiTheme({
  slider: {
    selectionColor: color
  },
});

    var actions=[
      <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleDialogClose}
        />,
        <FlatButton
          label="Vote"
          primary={true}
          onTouchTap={this.handleDialogSubmit}
          disabled={this.submitButtonDisabled()}
        />,
    ];
    var conditionMenuItems = this.props.conditions.map((condition,indx)=>{
    return(  <MenuItem value={indx} key={condition.id} primaryText={condition.title}  insetChildren={true} />);
    });
    return(
    <div className="vote-dialog-container">
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={true}
        open={this.state.dialogOpen}>
        <TextField floatingLabelText="title"
           type="text" fullWidth={true}
           value={this.state.title}
           onChange={this.handleTitleChange}/>
        <br/>
        <TextField
          floatingLabelText="description"
          type="text"
          multiLine={true}
          fullWidth={true}
          value={this.state.description}
          onChange={this.handleDescriptionChange}/>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              Rating:
              <Slider  min={-5} max={5} value={this.state.value} step={1} onChange={this.handleValueChange}/>
              <span>{this.state.value} </span>
            </div>
          </MuiThemeProvider>
          <SelectField
          value={0}
          onChange={this.handleConditionChange}
          maxHeight={200}
        >
          {conditionMenuItems}
        </SelectField>
        <br/>
          {this.props.message ? this.props.message : ""}

      </Dialog>
      <RaisedButton onClick={this.handleDialogOpen}>Vote</RaisedButton>

      </div>);
  }

}
export default VoteDialog;
