import React from 'react';
import GSAP from 'react-gsap-enhancer';

import { TweenMax, TimelineMax, TweenLite, } from 'gsap';

const createAnimation = ({target}) => {
  var cactus = target.find({id: 'img0'});
  var cactus2 = target.find({id: 'img2'});


  return new TimelineMax()
    .to(cactus, 2, {  display: 'none' })
    .to(cactus2, 2, { display: 'inline', })

}

class Cactus extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.animation = this.addAnimation(createAnimation);
  }

  render() {
    return (<div>
      <img id="img0" className="cactus" src="images/animations/cactus/cactus_0.svg" />
      <img id="img1" className="cactus" src="images/animations/cactus/cactus_1.svg" />
      <img id="img2" className="cactus" src="images/animations/cactus/cactus_2.svg" />
      <img id="img3" className="cactus" src="images/animations/cactus/cactus_3.svg" />
      <img id="img4" className="cactus" src="images/animations/cactus/cactus_4.svg" />
      <img id="img5" className="cactus" src="images/animations/cactus/cactus_5.svg" />
    </div>)
  }

}

export default GSAP()(Cactus)
