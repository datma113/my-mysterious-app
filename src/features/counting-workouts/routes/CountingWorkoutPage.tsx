import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { REST_TIME, WORKOUT_TIME } from "@/features/counting-workouts/utils";
import countingSounds from "@/assets/sounds/counting-sounds.mp3";
import doneSounds from "@/assets/sounds/done-sounds.mp3";
import restSounds from "@/assets/sounds/rest-sounds.mp3";

const INITIAL_INTERVAL = -1;

const countingSoundAudio = new Audio(countingSounds);
const doneSoundAudio = new Audio(doneSounds);
const restSoundAudio = new Audio(restSounds);

countingSoundAudio.loop = true;
restSoundAudio.loop = true;
export const CountingWorkoutPage = () => {
    const [workoutCounting, setWorkoutCounting] = useState(0);
    const [restCounting, setRestCounting] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [isInWorkout, setIsInWorkout] = useState(false);

    const [intervalStartWorkout, setIntervalStartWorkout] =
        useState(INITIAL_INTERVAL);
    const [intervalRest, setIntervalRest] = useState(INITIAL_INTERVAL);

    const handleSoundWhenStartWorkout = () => {
        doneSoundAudio.play();
        countingSoundAudio.play();
        restSoundAudio.pause();
    };
    const handleStartWorkout = () => {
        setIsStart(true);
        setIsInWorkout(true);

        handleSoundWhenStartWorkout();

        const interval = setInterval(() => {
            setWorkoutCounting((prev) => prev + 1);
        }, 1000);
        setIntervalStartWorkout(interval);
    };

    const handleStartRest = () => {
        countingSoundAudio.pause();
        doneSoundAudio.play();
        restSoundAudio.play();
        const interval = setInterval(() => {
            setRestCounting((prev) => prev + 1);
        }, 1000);
        setIntervalRest(interval);
    };

    const handleEndWorkout = () => {
        clearInterval(intervalStartWorkout);
        setIsStart(false);
        setRestCounting(0);
        setWorkoutCounting(0);
        clearInterval(intervalRest);
        countingSoundAudio.pause();
        restSoundAudio.pause();
    };

    useEffect(() => {
        if (!isStart) return;

        if (workoutCounting > WORKOUT_TIME) {
            setWorkoutCounting(0);
            setIsInWorkout(false);
            clearInterval(intervalStartWorkout);
            handleStartRest();
        }
    }, [workoutCounting, isInWorkout, intervalStartWorkout, isStart]);

    useEffect(() => {
        if (!isStart) return;

        if (isInWorkout) {
            setRestCounting(0);

            return;
        }

        if (restCounting > REST_TIME) {
            setRestCounting(0);
            clearInterval(intervalRest);
            handleStartWorkout();
        }
    }, [restCounting, isInWorkout, isStart, intervalRest]);

    return (
        <Stack direction={"column"} justifyContent={"left"} spacing={4}>
            <Stack direction={"row"} spacing={4}>
                <Button
                    variant="contained"
                    onClick={handleStartWorkout}
                    disabled={isStart}
                >
                    Start
                </Button>
                <Button
                    variant="contained"
                    color={"error"}
                    onClick={handleEndWorkout}
                    disabled={!isStart}
                >
                    end
                </Button>
            </Stack>
            <Stack direction={"row"} spacing={4}>
                <Typography textAlign={"left"} fontSize={"36px"} color={"red"}>
                    {workoutCounting}
                </Typography>
                <Typography
                    textAlign={"left"}
                    fontSize={"36px"}
                    color={"green"}
                >
                    {restCounting}
                </Typography>
            </Stack>
        </Stack>
    );
};
