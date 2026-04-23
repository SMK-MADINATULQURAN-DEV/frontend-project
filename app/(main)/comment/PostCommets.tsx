"use client";
import { 
  VStack, 
  HStack, 
  Text, 
  Box, 
  Input, 
  Button, 
  Separator,
  Circle
} from "@chakra-ui/react";
import { Send } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar"; // Sesuaikan path snippet Chakra v3 kamu
import { useCreateCommnt } from "./comment.service";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
}

interface PostCommentsProps {
  comments: Comment[];
  postId: string;
  onCommentSubmit?: (content: string, postId: string) => void;
}

export const PostComments = ({ comments, postId, onCommentSubmit }: PostCommentsProps) => {
  const [newComment, setNewComment] = useState("");

  const mutation = useCreateCommnt()



  const handleSend = () => {
    if (!newComment.trim()) return;
   mutation.mutate({ content: newComment, postId }, {
    onSuccess : () => {
        setNewComment("");
    }
   })
   
  };

  return (
    <VStack align="stretch" mt={4} gap={4} animation="fade-in">
      <Separator borderColor="gray.100" />
      
      {/* List Komentar */}
      <VStack align="stretch" maxH="300px" overflowY="auto" gap={3} pr={2}>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <HStack key={comment.id} align="start" gap={3}>
              <Avatar size="xs" src={comment.user?.avatar} name={comment.user?.name} />
              <Box bg="gray.50" p={3} borderRadius="2xl" flex={1}>
                <Text fontSize="xs" fontWeight="bold" color="gray.800">
                  {comment.user?.name}
                </Text>
                <Text fontSize="sm" color="gray.700" lineHeight="short">
                  {comment.content}
                </Text>
              </Box>
            </HStack>
          ))
        ) : (
          <Text fontSize="sm" color="gray.400" textAlign="center" py={4}>
            Belum ada komentar. Jadilah yang pertama!
          </Text>
        )}
      </VStack>

      {/* Input Komentar Baru */}
      <HStack gap={2} pt={2}>
        <Avatar size="xs" name="Me" /> {/* Avatar User Aktif */}
        <Input 
          placeholder="Tulis komentar..." 
          size="sm" 
          variant="subtle"
          borderRadius="full" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button 
          size="sm" 
          colorPalette="blue" 
          borderRadius="full"
          onClick={handleSend}
          disabled={!newComment.trim()}
        >
          <Send size={14} />
        </Button>
      </HStack>
    </VStack>
  );
};