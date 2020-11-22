import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import SelectProfileContainer from "./profile";
import { Loading, Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";

export function BrowseContainer({ slides }) {
  const [searchTerm,setSearchTerm] = useState('')
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);

  const user = firebase.auth.currentUser || {};

  useEffect(
    function () {
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout();
    },
    [profile.displayName]
  );

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
          <Header.Logo to={ROUTES.HOME} src={logo} alt='Netflix' />

          <Header.TextLink>
            Series
          </Header.TextLink>
          <Header.TextLink>
            Films
          </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.DropDow>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>
                    {user.displayName}
                  </Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink
                    onCLick={() => firebase.auth().signOut()}
                  >
                    Sign tut
                  </Header.TextLink>
                </Header.Group>
              </Header.DropDow>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>
            Watch Joker Now
          </Header.FeatureCallOut>
          <Header.Text>
            Forever alone in crowd,failed comedian Arthur Fleck seeks connection
            as he walks the streets of Gotham City. Arthur wears two masks --
            the one he paints for his day job as a clown, and the guise he
            projects in a futile attempt to feel like he's part of the world
            around him.
          </Header.Text>
          <Header.PlayButton>
            Play
          </Header.PlayButton>
        </Header.Feature>
      </Header>
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
