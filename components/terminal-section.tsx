"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Terminal } from "lucide-react";

// Type definitions for the file system
type FileContent = {
  type: "file";
  content: string;
};

type DirectoryContent = {
  type: "directory";
  url?: string;
  description?: string;
  tech?: string[];
  children: Record<string, FileContent | DirectoryContent>;
};

type FileSystem = {
  "/": DirectoryContent;
};

// Type guards
const isDirectory = (
  item: FileContent | DirectoryContent
): item is DirectoryContent => {
  return item.type === "directory";
};

const isFile = (item: FileContent | DirectoryContent): item is FileContent => {
  return item.type === "file";
};

// Static GitHub data structure
const fileSystem: FileSystem = {
  "/": {
    type: "directory",
    children: {
      projects: {
        type: "directory",
        children: {
          "portfolio-3d": {
            type: "directory",
            url: "https://portfolio-3d.vercel.app",
            description: "Interactive 3D portfolio with Three.js",
            tech: ["React", "Three.js", "Next.js"],
            children: {
              "README.md": {
                type: "file",
                content:
                  "# 3D Portfolio\n\nInteractive portfolio built with Three.js and React.",
              },
              "package.json": {
                type: "file",
                content:
                  '{\n  "name": "portfolio-3d",\n  "version": "1.0.0"\n}',
              },
            },
          },
          "e-commerce-app": {
            type: "directory",
            url: "https://shop-demo.vercel.app",
            description: "Full-stack e-commerce platform",
            tech: ["Next.js", "Stripe", "PostgreSQL"],
            children: {
              "README.md": {
                type: "file",
                content:
                  "# E-Commerce Platform\n\nModern shopping experience with Stripe integration.",
              },
              src: { type: "directory", children: {} },
            },
          },
          "chat-app": {
            type: "directory",
            url: "https://chat-demo.vercel.app",
            description: "Real-time chat application",
            tech: ["Node.js", "Socket.io", "React"],
            children: {
              "README.md": {
                type: "file",
                content:
                  "# Real-time Chat\n\nWebSocket-powered chat with file sharing.",
              },
            },
          },
          "rust-blockchain": {
            type: "directory",
            url: "https://github.com/user/rust-blockchain",
            description: "Blockchain implementation in Rust",
            tech: ["Rust", "Cryptography", "P2P"],
            children: {
              "README.md": {
                type: "file",
                content:
                  "# Rust Blockchain\n\nA simple blockchain implementation in Rust.",
              },
              "Cargo.toml": {
                type: "file",
                content: '[package]\nname = "blockchain"\nversion = "0.1.0"',
              },
            },
          },
        },
      },
      "about.txt": {
        type: "file",
        content:
          "Curious Developer\n\nFull-stack engineer passionate about:\n- Modern web technologies\n- 3D graphics and WebGL\n- Blockchain and Rust\n- Beautiful user interfaces\n\nAlways learning, always building.",
      },
      "skills.txt": {
        type: "file",
        content:
          "Technical Skills:\n\n• Frontend: React, Next.js, Three.js, TypeScript\n• Backend: Node.js, Rust, PostgreSQL\n• Tools: Git, Docker, Vercel, AWS\n• Design: Figma, Blender, Adobe Creative Suite",
      },
    },
  },
};

interface TerminalLine {
  type: "command" | "output" | "error";
  content: string;
  timestamp?: Date;
}

export function TerminalSection() {
  const [currentPath, setCurrentPath] = useState("/");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to CuriousOS Terminal v2.0.1" },
    { type: "output", content: "Type 'help' for available commands" },
    { type: "output", content: "" },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getCurrentDirectory = () => {
    const parts = currentPath.split("/").filter(Boolean);
    let current: FileContent | DirectoryContent = fileSystem["/"];

    for (const part of parts) {
      if (isDirectory(current) && current.children && current.children[part]) {
        current = current.children[part] as FileContent | DirectoryContent;
      }
    }
    return current;
  };

  const addToHistory = (line: TerminalLine) => {
    setHistory((prev) => [...prev, line]);
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add command to history
    addToHistory({
      type: "command",
      content: `curious@dev:${currentPath}$ ${trimmedCommand}`,
    });
    setCommandHistory((prev) => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmedCommand.split(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        addToHistory({ type: "output", content: "Available commands:" });
        addToHistory({
          type: "output",
          content: "  ls          - list directory contents",
        });
        addToHistory({
          type: "output",
          content: "  cd <dir>    - change directory",
        });
        addToHistory({
          type: "output",
          content: "  pwd         - show current directory",
        });
        addToHistory({
          type: "output",
          content: "  cat <file>  - display file contents",
        });
        addToHistory({
          type: "output",
          content: "  code .      - open current project",
        });
        addToHistory({
          type: "output",
          content: "  tree        - show directory tree",
        });
        addToHistory({
          type: "output",
          content: "  whoami      - display user info",
        });
        addToHistory({
          type: "output",
          content: "  clear       - clear terminal",
        });
        break;

      case "ls":
        const currentDir = getCurrentDirectory();
        if (isDirectory(currentDir) && currentDir.children) {
          Object.entries(currentDir.children).forEach(([name, item]) => {
            const icon = isDirectory(item) ? "📁" : "📄";
            const tech =
              isDirectory(item) && item.tech
                ? ` (${item.tech.join(", ")})`
                : "";
            addToHistory({ type: "output", content: `${icon} ${name}${tech}` });
          });
        } else {
          addToHistory({
            type: "output",
            content: "No items in current directory",
          });
        }
        break;

      case "pwd":
        addToHistory({ type: "output", content: currentPath });
        break;

      case "cd":
        if (args.length === 0) {
          setCurrentPath("/");
          addToHistory({
            type: "output",
            content: "Changed to root directory",
          });
        } else {
          const target = args[0];
          if (target === "..") {
            const parts = currentPath.split("/").filter(Boolean);
            parts.pop();
            setCurrentPath("/" + parts.join("/"));
          } else {
            const currentDir = getCurrentDirectory();
            if (
              isDirectory(currentDir) &&
              currentDir.children &&
              currentDir.children[target] &&
              isDirectory(currentDir.children[target])
            ) {
              const newPath =
                currentPath === "/" ? `/${target}` : `${currentPath}/${target}`;
              setCurrentPath(newPath);
              addToHistory({
                type: "output",
                content: `Changed directory to ${newPath}`,
              });
            } else {
              addToHistory({
                type: "error",
                content: `cd: ${target}: No such directory`,
              });
            }
          }
        }
        break;

      case "cat":
        if (args.length === 0) {
          addToHistory({ type: "error", content: "cat: missing file name" });
        } else {
          const fileName = args[0];
          const currentDir = getCurrentDirectory();
          if (
            isDirectory(currentDir) &&
            currentDir.children &&
            currentDir.children[fileName] &&
            isFile(currentDir.children[fileName])
          ) {
            const content =
              currentDir.children[fileName].content || "File is empty";
            content.split("\n").forEach((line) => {
              addToHistory({ type: "output", content: line });
            });
          } else {
            addToHistory({
              type: "error",
              content: `cat: ${fileName}: No such file`,
            });
          }
        }
        break;

      case "code":
        if (args[0] === ".") {
          const currentDir = getCurrentDirectory();
          if (isDirectory(currentDir) && currentDir.url) {
            addToHistory({
              type: "output",
              content: `Opening project: ${currentDir.url}`,
            });
            addToHistory({
              type: "output",
              content: "🚀 Launching in new tab...",
            });
            setTimeout(() => {
              window.open(currentDir.url, "_blank");
            }, 1000);
          } else {
            addToHistory({
              type: "error",
              content: "No project URL found in current directory",
            });
          }
        } else {
          addToHistory({ type: "error", content: "Usage: code ." });
        }
        break;

      case "tree":
        const showTree = (
          obj: DirectoryContent,
          prefix = "",
          isLast = true
        ) => {
          if (obj.children) {
            Object.entries(obj.children).forEach(
              ([name, item], index, array) => {
                const isLastItem = index === array.length - 1;
                const icon = isDirectory(item) ? "📁" : "📄";
                addToHistory({
                  type: "output",
                  content: `${prefix}${
                    isLastItem ? "└── " : "├── "
                  }${icon} ${name}`,
                });
                if (isDirectory(item) && item.children) {
                  showTree(
                    item,
                    prefix + (isLastItem ? "    " : "│   "),
                    isLastItem
                  );
                }
              }
            );
          }
        };
        addToHistory({ type: "output", content: "📁 /" });
        showTree(fileSystem["/"]);
        break;

      case "whoami":
        addToHistory({ type: "output", content: "curious-developer" });
        addToHistory({
          type: "output",
          content: "Full-stack engineer & digital artist",
        });
        addToHistory({
          type: "output",
          content: "Passionate about modern web technologies",
        });
        break;

      case "clear":
        setHistory([]);
        break;

      default:
        addToHistory({
          type: "error",
          content: `Command not found: ${cmd}. Type 'help' for available commands.`,
        });
    }

    addToHistory({ type: "output", content: "" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111111] relative">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #00ff00 1px, transparent 1px), 
                           linear-gradient(to bottom, #00ff00 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 font-mono"
            style={{
              background: "linear-gradient(45deg, #00ff00, #4ecdc4, #ffd93d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"<Terminal/>"}
          </h2>
          <p className="text-xl text-green-400 max-w-2xl mx-auto font-mono">
            Navigate through my projects using terminal commands
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card
            className="bg-black/80 backdrop-blur-sm border-2 overflow-hidden"
            style={{
              borderColor: "rgba(0, 255, 0, 0.3)",
              boxShadow: "0 0 30px rgba(0, 255, 0, 0.2)",
            }}
          >
            {/* Terminal Header */}
            <div className="bg-gray-900 px-4 py-3 border-b border-green-500/30 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-center">
                <Terminal className="h-4 w-4 text-green-400" />
                <span className="text-green-400 text-sm font-mono">
                  curious-terminal
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-6 h-96 overflow-y-auto font-mono text-sm"
              style={{
                background: "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)",
                textShadow: "0 0 5px rgba(0, 255, 0, 0.3)",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Terminal History */}
              {history.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    line.type === "command"
                      ? "text-green-300"
                      : line.type === "error"
                      ? "text-red-400"
                      : "text-green-500"
                  }`}
                >
                  {line.content}
                </div>
              ))}

              {/* Current Input Line */}
              <div className="flex items-center text-green-300">
                <span className="mr-2">curious@dev:{currentPath}$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-green-500"
                  autoFocus
                  spellCheck={false}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-4 bg-green-500 ml-1"
                />
              </div>
            </div>

            {/* Terminal Footer with Quick Commands */}
            <div className="bg-gray-900 px-4 py-2 border-t border-green-500/30">
              <div className="flex flex-wrap gap-2 text-xs">
                {["ls", "cd projects", "cat about.txt", "tree", "help"].map(
                  (cmd) => (
                    <button
                      key={cmd}
                      onClick={() => {
                        setCurrentCommand(cmd);
                        inputRef.current?.focus();
                      }}
                      className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 hover:bg-green-500/30 transition-colors font-mono"
                    >
                      {cmd}
                    </button>
                  )
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Terminal Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">
            Try commands like{" "}
            <code className="text-green-400 bg-black/50 px-2 py-1 rounded">
              cd projects
            </code>
            ,{" "}
            <code className="text-green-400 bg-black/50 px-2 py-1 rounded">
              ls
            </code>
            , or{" "}
            <code className="text-green-400 bg-black/50 px-2 py-1 rounded">
              code .
            </code>{" "}
            to explore!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>• Use ↑/↓ arrows for command history</span>
            <span>• Type 'help' for all commands</span>
            <span>• Click terminal to focus</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
