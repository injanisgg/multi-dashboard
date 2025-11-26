import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({
    title = 'Error',
    message,
    onRetry,
}: ErrorMessageProps) {
    return(
        <Alert variant={"destructive"} className="my-4">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="mt-2">
                {message}
                {onRetry && (
                    <Button
                     variant={"outline"}
                     size="sm"
                     onClick={onRetry}
                     className="mt-3 ml-0"
                    >
                        Try Again
                    </Button>
                )}
            </AlertDescription>
        </Alert>
    )
}