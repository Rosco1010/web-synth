import React, { useState, useReducer, useEffect } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import Challenge from './Challenge';

const ChallengeLinks = (props) => (
  <ul>
    <li><Link className='challenge-link' to={props.match.url + '/challenge1'}>Challenge 1</Link></li>
    <li><Link className='challenge-link' to={props.match.url + '/challenge2'}>Challenge 2</Link></li>
  </ul>
);

const challenges = [
  'challenge1',
  'challenge2',
];

function Challenges(props) {
  const [currChallenge, setCurrChallenge] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  console.log(currChallenge);

  useEffect(() => {
    if (isRedirecting) {
      console.log('redirecting!');
      setIsRedirecting(false);
      props.history.push(`${props.match.url}${currChallenge !== null ? '/'+challenges[currChallenge] : ''}`);
    }
  }, [isRedirecting]);

  return (
    <main>
      <h2>Challenges</h2>
      <p>Start your learning journey here!</p>

      <Switch>
        <Route exact path={props.match.url} component={ChallengeLinks} />
        <Route path={props.match.url + '/:challenge'} component={() => <Challenge title={challenges[currChallenge]} />} />
      </Switch>

      <button onClick={() => {
        setCurrChallenge(null);
        setIsRedirecting(true);
      }}>CHALLENGES</button>  
      <button onClick={() => {
        if (currChallenge !== null && currChallenge > 0) {
          setCurrChallenge(currChallenge - 1);
        }
        else {
          setCurrChallenge(challenges.length - 1);
        }
        setIsRedirecting(true);
      }}>PREV</button>  
      <button onClick={() => {
        if (currChallenge !== null && currChallenge < (challenges.length - 1)) {
          setCurrChallenge(currChallenge + 1);
        }
        else {
          setCurrChallenge(0);
        }
        setIsRedirecting(true);
      }}>NEXT</button>
    </main>
  );
}


export default Challenges;
