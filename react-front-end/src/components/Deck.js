import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import "../styles/Deck.css";
import { makeStyles } from '@material-ui/core'; 
import Modal from 'react-modal'
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const customStyles = {
  content: {
    display: "flex",
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px"
  },
  overlay: {
    zIndex: 10
  }
};

export default function Deck(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { title, description, image, tags, id, deck_id } = props;
  const classes = useStyles();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = () => {
    window.location.href=`/study/${deck_id}`;
  };
  const handleEdit = () => {
    window.location.href=`/decks/${deck_id}/edit`;
  }
  const handleDelete = () => {
    axios.post(`/api/decks/${deck_id}/delete`)
  }
  const handleConfirm = () => {
    openModal();
  }
  const handleDefault = (e) => {
    e.target.src = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
  }
  const buttonHandler = () => {
    if (props.edit) {
      return (
        <div>
          <Button disabled={true} onClick={handleEdit} style={{minWidth: '0px'}} color={'primary'}><EditIcon/></Button>
          <Button disabled={true} onClick={handleConfirm} style={{minWidth: '0px'}} color={'secondary'} ><DeleteIcon/></Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button onClick={handleEdit} style={{minWidth: '0px'}}color={'primary'}><EditIcon/></Button>
          <Button onClick={handleConfirm} style={{minWidth: '0px'}} color={'secondary'} ><DeleteIcon/></Button>
        </div>
      )
    }
  }
  return (
    <Card className="root" style={{  boxShadow: '0 10px 15px 0 rgba(0,0,0,.18)', borderRadius: "15px" }}>
        <div className="cover">
          <div onClick={handleSubmit} className="deck-image">
            <img onError={handleDefault} src={image} alt={title}></img>
          </div>
          <div className="deck-info">
            <CardActions style={{alignSelf: 'center'}}disableSpacing>
              <Typography
                variant="h6"
                color="textSecondary"
                align="center"
                component="p"
                style={{ textAlign: "center" }}
              >
                {title}
              </Typography>
            </CardActions>

            <CardActions style={{ marginTop: "auto" }} disableSpacing>
              <Typography
                align="right"
                variant="subtitle2"
                component="p"
                style={{ textAlign: "left" }}
              >
                {description}
              </Typography>
            </CardActions>

            <CardActions
              style={{ justifyContent: "flex-end", marginTop: "auto" }}
              disableSpacing
              >
              <Typography
                align="right"
                variant="subtitle2"
                component="span"
                style={{ textAlign: "left" }}
                >
                {buttonHandler()}
              <div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  ariaHideApp={false}
                >
                  <div>
                    <h2>Are you sure you want to delete {title}?</h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button onClick={closeModal}>X</Button>
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}>
                    <Button onClick={handleDelete} color={'secondary'}variant={'contained'} >Yes</Button>
                    <Button onClick={closeModal} color={'primary'} variant={'contained'} >No</Button>
                    </div>
                  </div>
                </Modal>
              </div>
              </Typography>
            </CardActions>
          </div>
        </div>
    </Card>
  );
}
