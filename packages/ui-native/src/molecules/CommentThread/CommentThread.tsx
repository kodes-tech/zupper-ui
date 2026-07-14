import React from 'react';
import { Text, View } from 'react-native';

export type Comment = { id: string; name: string; text: string };

export type CommentThreadProps = {
  /** Comentário/legenda do próprio autor do conteúdo, acima da lista. */
  authorComment?: { name: string; text: string };
  comments: Comment[];
};

/**
 * CommentThread — legenda do autor + título "Comentários (N)" + lista de
 * respostas (avatar sólido + nome + texto). Reproduz os blocos de comentário de
 * `_figma/conteudo`. Os avatares das respostas são círculos sólidos no Figma.
 */
export const CommentThread = ({
  authorComment,
  comments,
}: CommentThreadProps): React.ReactElement => (
  <View className="gap-md">
    {authorComment ? (
      <View className="gap-xs">
        <Text className="font-sans text-cardTitle text-fg-primary">{authorComment.name}</Text>
        <Text className="font-sans text-bodyText text-fg-secondary">{authorComment.text}</Text>
      </View>
    ) : null}

    <Text className="text-center font-sans text-cardTitle text-fg-primary">
      Comentários ({comments.length})
    </Text>

    {comments.map((comment) => (
      <View key={comment.id} className="flex-row items-start gap-[10px]">
        <View className="h-[28px] w-[28px] rounded-pill bg-border-default" />
        <View className="flex-1 gap-xxs">
          <Text className="font-sans text-authorName text-fg-primary">{comment.name}</Text>
          <Text className="font-sans text-bodyText text-fg-secondary">{comment.text}</Text>
        </View>
      </View>
    ))}
  </View>
);
