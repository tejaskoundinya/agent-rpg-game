import { useRecoilValue } from 'recoil';
import RenderMap from './components/map-layout/RenderMap';
import RenderAgentSelect from './components/agent-select-layout/RenderAgentSelect';
import { CurrentSceneAtom } from './atoms/CurrentSceneAtom';
import './App.css';
import { useEffect, useState } from 'react';
import RenderAgentCreation from './components/agent-creation-layout/RenderAgentCreation';

function App() {
  const currentScene = useRecoilValue(CurrentSceneAtom);
  const [scene, setScene] = useState(currentScene.currentSceneId);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
    const timer = setTimeout(() => {
      setScene(currentScene.currentSceneId);
      setTransition(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentScene]);

  return (
    <>
      <div className={`app-container ${transition ? 'fade-out' : 'fade-in'}`}>
        {scene === 'map-scene' && <RenderMap />}
        {scene === 'agent-selection-scene' && <RenderAgentSelect />}
        {scene === 'agent-creation-scene' && <RenderAgentCreation />}
      </div>
      <audio id='ui-switch' src='/audio/ui-switch.wav'></audio>
      <audio id='ui-select' src='/audio/ui-select.wav'></audio>
      <audio id='conversation' src='/audio/conversation.wav'></audio>
    </>
  );
}

export default App;
