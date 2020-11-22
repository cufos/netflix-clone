import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Fuse from "fuse.js";
import { FirebaseContext } from "../context/firebase";
import SelectProfileContainer from "./profile";
import { Loading, Header, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import FooterContainer from "../containers/footer";

export default function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("series");
  const [slideRows, setSlidesRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);

  const user = firebase.auth().currentUser || {};

  useEffect(
    function () {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    },
    [profile.displayName]
  );

  useEffect(
    function () {
      setSlidesRows(slides[category]);
    },
    [slides, category]
  );

  useEffect(
    function () {
      const fuse = new Fuse(slideRows, {
        keys: ["data.description", "data.title", "data.genre"],
      });

      const results = fuse.search(searchTerm).map(({ item }) => item);

      if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
        setSlidesRows(results);
      } else {
        setSlidesRows(slides[category]);
      }
    },
    [searchTerm]
  );

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />

            <Header.TextLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === "films" ? "true" : "false"}
              onClick={() => setCategory("films")}
            >
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
              <Header.DropDown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign tut
                  </Header.TextLink>
                </Header.Group>
              </Header.DropDown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Forever alone in crowd,failed comedian Arthur Fleck seeks connection
            as he walks the streets of Gotham City. Arthur wears two masks --
            the one he paints for his day job as a clown, and the guise he
            projects in a futile attempt to feel like he's part of the world
            around him.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Card.Group>
        {slideRows?.map((slidesItem) => (
          <Card key={`${category}-${slidesItem.title.toLowerCase()}`}>
            <Card.Title>{slidesItem.title}</Card.Title>
            <Card.Entities>
              {slidesItem.data?.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Image
                    src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>

            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
