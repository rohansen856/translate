"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
    GlobeIcon,
    ArrowRight,
    Sparkles,
    FileText,
    Languages,
    Settings,
    History,
    Upload,
} from "lucide-react"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { FloatingIcons } from "@/components/floating-icons"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

export default function Home() {
    const router = useRouter()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const features = [
        {
            title: "Text Translation",
            description: "Translate text in real-time with high accuracy.",
            icon: Languages,
            path: "/translate",
        },
        {
            title: "File Translation",
            description: "Upload and translate text files seamlessly.",
            icon: FileText,
            path: "/translate/document",
        },
        {
            title: "Batch Translation",
            description: "Translate multiple texts at once efficiently.",
            icon: Upload,
            path: "/translate/multi",
        },
    ]

    const faqItems = [
        {
            question: "How accurate are the translations?",
            answer: "Our translations are powered by advanced AI technology, providing high accuracy across multiple languages.",
        },
        {
            question: "Which file formats are supported?",
            answer: "Currently, we support .txt files for translation. More formats coming soon!",
        },
        {
            question: "Is there a limit to translation length?",
            answer: "You can translate texts up to 5000 characters at once. For longer texts, please use our file translation feature.",
        },
    ]

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedGradientBackground />
            <FloatingIcons />

            <div className="container mx-auto px-4 py-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mb-8"
                    >
                        <GlobeIcon className="h-20 w-20 text-primary" />
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                    >
                        Translate Hub
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto"
                    >
                        Break language barriers with our advanced translation
                        platform. Powered by cutting-edge AI technology.
                    </motion.p>

                    <motion.div variants={itemVariants} className="space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg"
                                >
                                    Start Translating{" "}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 glass-morphism">
                                {features.map((feature) => (
                                    <DropdownMenuItem
                                        key={feature.path}
                                        onClick={() =>
                                            router.push(feature.path)
                                        }
                                        className="flex items-center space-x-2"
                                    >
                                        <feature.icon className="h-4 w-4" />
                                        <span>{feature.title}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => router.push("/login")}
                            className="h-14 px-8 text-lg glass-morphism"
                        >
                            Sign In
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="group cursor-pointer"
                                onClick={() => router.push(feature.path)}
                            >
                                <Card className="p-8 rounded-xl glass-morphism border border-border/50 hover:border-primary/50 transition-all">
                                    <feature.icon className="h-10 w-10 mb-4 text-primary group-hover:text-secondary transition-colors" />
                                    <h3 className="text-2xl font-semibold mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {feature.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-32"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold mb-8 gradient-text"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.div
                            variants={itemVariants}
                            className="max-w-2xl mx-auto"
                        >
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {faqItems.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                    >
                                        <AccordionTrigger className="text-left">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-left">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-32 mb-16"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold mb-8 gradient-text"
                        >
                            Ready to Get Started?
                        </motion.h2>
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center space-x-4"
                        >
                            <Button
                                size="lg"
                                onClick={() => router.push("/translate")}
                                className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg"
                            >
                                Try for Free{" "}
                                <Sparkles className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => router.push("/dashboard")}
                                className="h-14 px-8 text-lg glass-morphism"
                            >
                                View Dashboard
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
