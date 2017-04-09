import React from 'react';
import GSAP from 'react-gsap-enhancer';
import { TimelineMax, } from 'gsap';

const createAnimation = ({target, options, }) => {

  const bodyFrames = [
    { bottom: '5px', height: '0px', },
    { bottom: '15px', height: '50px', },
    { bottom: '20px', height: '50px', },
    { bottom: '25px', height: '60px', },
    { bottom: '30px', height: '65px', },
    { bottom: '30px', height: '70px', },
    { bottom: '35px', height: '70px', },
    { bottom: '40px', height: '70px', },
    { bottom: '45px', height: '72px', },
    { bottom: '50px', height: '77px', },
    { bottom: '52px', height: '81px', },
  ];

  const armFrames = [
    { visibility: 'hidden', },
    { visibility: 'hidden', },
    { visibility: 'hidden', },
    { visibility: 'hidden', },
    { visibility: 'visible', },
    { visibility: 'visible', },
    { visibility: 'visible', },
    { visibility: 'visible', },
    { visibility: 'visible', },
    { visibility: 'visible', },
    { visibility: 'visible', },
  ];

  const cactus3 = target.find({ id: 'cactus3', });
  const arms = target.find({ id: 'arms', });

  let t1 = new TimelineMax();

  const getFrames = (frames, score, previousScore) => {
    return score > previousScore
      ? frames.slice(previousScore, score + 1)
      : frames.slice(score, previousScore + 1).reverse();
  };

  const bodySequence = getFrames(bodyFrames, options.score, options.previousScore);
  const armsSequence = getFrames(armFrames, options.score, options.previousScore);

  bodySequence.forEach((frame, index) => {
    t1.to(cactus3, 0.3, frame, )
        .to(arms, 0.5, armsSequence[index], '-=0.5');
  });

  t1.eventCallback('onComplete', options.setPreviousScore());

  return t1;
};

class Cactus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      previousScore: this.props.previousScore,
      score: this.props.score,
    };
  }

  componentWillMount() {
    this.timerID = setInterval(
        () => this.tick(),
        100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {

    this.setState({
      previousScore: this.props.previousScore,
      score: this.props.score,
    });

    const options = {
      ...this.state,
      setPreviousScore: this.props.setPreviousScore,
    };

    if (options.score === options.previousScore) {
      return;
    }

    this.animation = this.addAnimation(createAnimation, options);

  }

  render() {
    return (
      <div className="cactus-animation">
        <img id="vase" className="vase" src="images/animations/cactus/cactus_0.svg" />

          <svg id="cactus3" className="cactus" width="81px" height="80px" viewBox="0 0 81 80" version="1.1">
              <title>cactus_3</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="cactus_animation" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="cactus_3" transform="translate(-121.000000, -121.000000)">
                      <g transform="translate(122.000000, 122.000000)">
                          <g id="cactus" transform="translate(10.000000, 0.000000)">
                              <g id="body" transform="translate(10.851018, 0.000000)">
                                  <path d="M38.7156817,47.5 L38.7156817,81.4782699 L0.264807575,81.3114345 L0.264807575,64 M0.264807575,54.5 L0.264807575,19.2181716 C0.264807575,8.60426849 8.86999434,0 19.4902446,0 C30.1081603,0 38.7156817,8.60025584 38.7156817,19.2284936 L38.7156817,38.4288411" id="Combined-Shape" stroke="#2364AA"></path>
                                  <path d="M2.72171937,19.2318151 C2.72171937,8.61037691 11.3269061,0 21.9471564,0 L21.9471564,0 C32.5650721,0 41.1725935,8.61748649 41.1725935,19.2276712 L41.1725935,81.2427871 L2.72171937,81.4782699 L2.72171937,19.2318151 Z" id="Combined-Shape" fill="#8FD094" opacity="0.55"></path>
                                  <path d="M6.89640124,13.2904386 C6.89640124,5.95033204 12.8418675,0 20.1795745,0 L20.1795745,0 C27.5156685,0 33.4627477,5.94180455 33.4627477,13.283595 L33.4627477,81.4782699 L6.89640124,81.3114345 L6.89640124,13.2904386 Z" id="Combined-Shape" stroke="#8FD094" opacity="0.693953804"></path>
                                  <path d="M20.7004832,0 L20.7004832,81.1628361" id="Path-20" stroke="#8FD094" opacity="0.69"></path>
                              </g>
                              <g id="arms" transform="translate(0.000000, 20.000000)">
                                  <path d="M49.2559206,18.1766355 C49.2559206,18.1766355 52.8363595,18.0447098 52.8363595,14.8784944 C52.8363595,11.7122789 52.8363595,4.45636843 52.8363595,4.45636843 C52.8363595,4.45636843 53.0832864,0.630524734 56.7871887,0.498599089 C60.4910911,0.366673445 60.9849447,4.45636843 60.9849447,4.45636843 L60.9849447,11.0609287 C60.9849447,14.4808014 59.8286932,19.7401698 59.5033838,20.2874458 C59.5033838,20.2874458 59.8976857,19.7818528 59.5033838,20.2874458 C58.8860667,21.0789997 53.3302132,27.2795049 49.2559206,26.883728 M11.5157488,43.3648675 C7.51554132,43.7453123 2.06071294,37.785009 1.4546209,37.0241192 C1.00541124,36.2498997 0,31.7077841 0,28.7477386 L0,21.8063234 C0,21.8063234 0.484873633,17.8750595 4.12142588,18.0018744 C7.75797813,18.1286894 8.00041495,21.8063234 8.00041495,21.8063234 L8.00041495,31.8247056 C8.00041495,34.8682648 11.5157488,34.9950798 11.5157488,34.9950798 L11.5157488,34.9950798" id="Combined-Shape" stroke="#2364AA"></path>
                                  <path d="M52.5165692,18.7766253 C53.4017198,18.3497386 54.2548768,17.5403143 54.2548768,16.0078708 C54.2548768,12.8951817 54.2548768,5.76193572 54.2548768,5.76193572 C54.2548768,5.76193572 54.4976292,2.00076966 58.1389154,1.87107428 C61.7802016,1.7413789 62.2657064,5.76193572 62.2657064,5.76193572 L62.2657064,13.2798165 C62.2657064,16.0757974 61.318774,20.4132765 60.809192,21.3253815 C60.809192,21.3253815 61.196828,20.8283358 60.809192,21.3253815 C60.288736,21.9927354 56.1975708,26.5709225 52.5165692,27.615927 C51.9053155,27.7894566 53.0869744,27.3919296 52.5165692,27.3365204 L52.5165692,18.7766253 Z M13.5,36.1667097 L13.5,45 C9.2782688,45.4015132 2.30852014,39.3300176 1.6688639,38.5269912 C1.26029321,38.0140704 1.6688639,38.5269912 1.6688639,38.5269912 C1.43179277,38.1538508 0.133688917,32.4574144 0.133688917,28.7674478 L0.133688917,22.4664634 C0.133688917,22.4664634 0.645413911,18.3174938 4.48335136,18.4513315 C8.32128882,18.5851692 8.57715131,22.4664634 8.57715131,22.4664634 C8.57715131,22.4664634 8.57715131,29.8275387 8.57715131,33.0396442 C8.57715131,36.2517498 13.5,36.1667097 13.5,36.1667097 Z" id="Combined-Shape" fill="#8FD094" opacity="0.55"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </svg>
      </div>
    );
  }
}

Cactus.proptypes = {
  previousScore: React.PropTypes.int,
  score: React.PropTypes.int,
};

export default GSAP()(Cactus);
