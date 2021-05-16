registerAnimator(
    'my-awesome-animator',
    class Passthrough extends StatelessAnimator {
        animate(currentTime, effect) {
            // The simplest custom animator that does exactly what regular animations do!
            effect.localTime = currentTime;
        }
    }
);


/[a-z]/