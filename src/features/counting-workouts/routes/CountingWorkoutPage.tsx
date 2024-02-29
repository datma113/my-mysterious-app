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
    const [totalTimeCounted, setTotalTimeCounted] = useState(0);
    const [totalTimeCountedInterval, setTotalTimeCountedInterval] =
        useState(INITIAL_INTERVAL);

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

    const handleSoundWhenStartRest = () => {
        countingSoundAudio.pause();
        doneSoundAudio.play();
        restSoundAudio.play();
    };
    const handleStartWorkout = () => {
        setIsStart(true);
        setIsInWorkout(true);

        handleSoundWhenStartWorkout();

        const workoutCountingInterval = setInterval(() => {
            setWorkoutCounting((prev) => prev + 1);
        }, 1000);
        setIntervalStartWorkout(workoutCountingInterval);

        if (!isStart) {
            const totalTimeInterval = setInterval(() => {
                setTotalTimeCounted((p) => p + 1);
            }, 1000);
            setTotalTimeCountedInterval(totalTimeInterval);
        }
    };

    const handleStartRest = () => {
        handleSoundWhenStartRest();

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
        clearInterval(totalTimeCountedInterval);

        countingSoundAudio.pause();
        restSoundAudio.pause();
    };

    useEffect(() => {
        if (!isStart) return;

        const endWorkoutProcess = workoutCounting > WORKOUT_TIME;
        if (endWorkoutProcess) {
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

        const endRestProcess = restCounting > REST_TIME;
        if (endRestProcess) {
            setRestCounting(0);

            clearInterval(intervalRest);

            handleStartWorkout();
        }
    }, [restCounting, isInWorkout, isStart, intervalRest]);

    return (
        <Stack direction={"column"} alignItems={"center"} spacing={2}>
            <Stack direction={"row"} justifyContent={"center"} spacing={2}>
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
            <Stack>
                <Typography>Total: {totalTimeCounted}</Typography>

                <Typography color={"red"}>
                    Workout time set: {WORKOUT_TIME}
                </Typography>
                <Typography color={"green"}>
                    Rest time set: {REST_TIME}
                </Typography>
            </Stack>

            <Stack direction={"column"}>
                {isInWorkout && isStart && (
                    <>
                        <Typography fontSize={"150px"} color={"red"}>
                            {workoutCounting}
                        </Typography>
                        <Typography
                            fontWeight={"medium"}
                            fontSize={"36px"}
                            color={"red"}
                        >
                            In workout
                        </Typography>
                    </>
                )}
                {!isInWorkout && isStart && (
                    <>
                        <Typography
                            textAlign={"left"}
                            fontSize={"150px"}
                            color={"green"}
                        >
                            {restCounting}
                        </Typography>
                        <Typography
                            fontWeight={"medium"}
                            fontSize={"36px"}
                            color={"green"}
                        >
                            In Rest
                        </Typography>
                    </>
                )}
            </Stack>
        </Stack>
    );
};
