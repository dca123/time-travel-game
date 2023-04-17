"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";

export default function Home() {
  return (
    <main className="flex flex-row space-x-3">
      <div className="flex flex-col space-y-2">
        <h1 className="text-md text-center font-light italic">Past</h1>
        <EraBoard />
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-md text-center font-light italic">Present</h1>
        <EraBoard />
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-md text-center font-light italic">Future</h1>
        <EraBoard />
      </div>
    </main>
  );
}

const EraBoard = () => {
  const [player1Pos, setPlayer1Pos] = useState({ x: 0, y: 0 });
  const [player2Pos, setPlayer2Pos] = useState({ x: 3, y: 3 });
  return (
    <div>
      <DndContext
        onDragEnd={(event) => {
          if (event.over) {
            console.log(event);
            const { id } = event.over as { id: number };
            const x = id % 4;
            const y = Math.floor(id / 4);
            if (event.active.id === "player-1") {
              setPlayer1Pos({ x, y });
            } else {
              setPlayer2Pos({ x, y });
            }
          }
        }}
      >
        <div className="relative border border-slate-400">
          <PlayerPiece id="player-1" x={player1Pos.x} y={player1Pos.y} />
          <PlayerPiece id="player-2" x={player2Pos.x} y={player2Pos.y} />

          <div className="flex flex-row">
            <Space id={0} isDark={false} />
            <Space id={1} isDark={true} />
            <Space id={2} isDark={false} />
            <Space id={3} isDark={true} />
          </div>
          <div className="flex flex-row">
            <Space id={4} isDark={true} />
            <Space id={5} isDark={false} />
            <Space id={6} isDark={true} />
            <Space id={7} isDark={false} />
          </div>
          <div className="flex flex-row">
            <Space id={8} isDark={false} />
            <Space id={9} isDark={true} />
            <Space id={10} isDark={false} />
            <Space id={11} isDark={true} />
          </div>
          <div className="flex flex-row">
            <Space id={12} isDark={true} />
            <Space id={13} isDark={false} />
            <Space id={14} isDark={true} />
            <Space id={15} isDark={false} />
          </div>
        </div>
      </DndContext>
    </div>
  );
};
type PlayerPieceProps = {
  id: string;
  x: number;
  y: number;
};
const PlayerPiece = (props: PlayerPieceProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        left: `${props.x * 5 + 0.5}em`,
        top: `${props.y * 5 + 0.5}em`,
      }
    : {
        left: `${props.x * 5 + 0.5}em`,
        top: `${props.y * 5 + 0.5}em`,
      };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={clsx(
        "absolute h-16 w-16 rounded-full ",
        props.id === "player-1" ? "bg-red-400" : "bg-blue-400"
      )}
      style={style}
    />
  );
};

type SpaceProps = {
  id: number;
  isDark: boolean;
};
const Space = (props: SpaceProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      id: props.id,
    },
  });
  const style = {
    backgroundColor: isOver ? "red" : "blue",
  };
  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "h-20 w-20 ",
        props.isDark ? "bg-slate-600" : "bg-slate-200"
      )}
    >
      <p
        className={clsx(
          "select-none pl-1 pt-1 text-xs",
          props.isDark ? "text-slate-200" : "text-slate-600"
        )}
      >
        {props.id}
      </p>
    </div>
  );
};
