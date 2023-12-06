import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    Promise.all([api.getCards(), api.getUserInformation()])
      .then(([cardsArray, userInfo]) => {
        setCards(cardsArray);
        setCurrentUser(userInfo);
      })
      .catch((err) =>
        console.log(
          `Ошибка загрузки карточек и/или информации о пользователе: ${err}`
        )
      );
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .likeCard({ cardId: card._id, isLiked: isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        console.log(`Ошибка постановки лайка на карточку: ${err}`)
      );
  };

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => setCards((state) => state.filter((c) => c._id !== cardId)))
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  };

  const handleUpdateUser = (currentUser) => {
    setRenderLoading(true);
    api
      .editUserInformation(currentUser)
      .then((newUser) => {
        setCurrentUser({ ...currentUser, ...newUser });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления информации о пользователе: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  const handleUpdateAvatar = (currentUser) => {
    setRenderLoading(true);
    api
      .editAvatar(currentUser.avatar)
      .then((newAvatar) => {
        setCurrentUser({ ...currentUser, ...newAvatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  const handleAddPlace = (data) => {
    setRenderLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления нового места: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        <Header loggedIn={loggedIn}/>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={
                  <Main/>}
                  loggedIn={loggedIn}
                    onEditProfile={() => {
                      handleEditProfileClick();
                    }}
                    onAddPlace={() => {
                      handleAddPlaceClick();
                    }}
                    onEditAvatar={() => {
                      handleEditAvatarClick();
                    }}
                    onCardClick={(card) => {
                      handleCardClick(card);
                    }}
                    onCardLike={(card) => {
                      handleCardLike(card);
                    }}
                    onCardDelete={(card) => {
                      handleCardDelete(card);
                    }}
                    cards={cards}
                  />
                }
                
              />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={renderLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={renderLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={() => {
            closeAllPopups();
          }}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="deleteCard"
          buttonText="Да"
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={renderLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;