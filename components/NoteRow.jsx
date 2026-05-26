import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { LinkIcon } from '@twilio-paste/icons/cjs/LinkIcon';
import { LOG_TYPES } from '../lib/content';

export const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  tv: 'TV',
  article: 'Article',
  game: 'Game',
  essay: 'Essay',
  thought: 'Thought',
};

export function noteUrl(note) {
  if (!note.date) return `/notes/${note.slug}`;
  const d = new Date(note.date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `/notes/${year}/${month}/${note.slug}`;
}

export function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function CoverImage({ note }) {
  return (
    <Box
      overflow="hidden"
      borderStyle={note.cover ? 'solid' : 'none'}
      borderColor="colorBorderBrandHighlight"
      style={{
        width: '8.594rem',
        height: '12.891rem',
        borderWidth: note.cover ? '6px' : '0',
        flexShrink: 0,
      }}
    >
      {note.cover && (
        <Box
          as="img"
          src={note.cover}
          alt={note.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </Box>
  );
}

function NoteBody({ note, isThought }) {
  return (
    <>
      {note.contentHtml && (
        <Box
          fontSize="fontSize30"
          lineHeight="lineHeight30"
          color="colorText"
          fontStyle={isThought ? 'italic' : 'normal'}
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />
      )}
      {note.source && (
        <Box marginTop="space40">
          <Anchor href={note.source} showExternal>
            View source
          </Anchor>
        </Box>
      )}
    </>
  );
}

function CopyLinkButton({ note }) {
  const [label, setLabel] = useState('Copy link');
  const [visible, setVisible] = useState(false);

  return (
    <Box position="relative" display="inline-flex" alignItems="center">
      <Box
        as="button"
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}${noteUrl(note)}`);
          setLabel('Copied!');
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => { setVisible(false); setLabel('Copy link'); }}
        display="inline-flex"
        alignItems="center"
        color="colorTextWeak"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', lineHeight: 0 }}
      >
        <LinkIcon decorative={false} title="Copy link" />
      </Box>
      {visible && (
        <Box
          position="absolute"
          backgroundColor="colorBackgroundInverse"
          color="colorTextInverse"
          fontSize="fontSize10"
          paddingX="space30"
          paddingY="space20"
          borderRadius="borderRadius20"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {label}
        </Box>
      )}
    </Box>
  );
}

export function NoteRow({ note }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isThought = note.type === 'thought';

  const dateText = (
    <Text
      as="span"
      fontSize="fontSize10"
      color="colorTextWeak"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
    >
      <ScreenReaderOnly>{TYPE_LABELS[note.type] || note.type} logged on </ScreenReaderOnly>
      {formatDate(note.date)}
    </Text>
  );

  const titleMeta = (
    <>
      <Box display="flex" alignItems="center" columnGap="space20" marginBottom="space20">
        <Heading as="h2" variant="heading30" marginBottom="space0" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Link href={noteUrl(note)} legacyBehavior passHref>
            <Anchor style={{ textDecoration: 'none' }}>
              <Box as="span" fontStyle={isThought ? 'italic' : 'normal'}>
                {note.title}
              </Box>
            </Anchor>
          </Link>
        </Heading>
        <CopyLinkButton note={note} />
      </Box>
      {note.creator && (
        <Box marginBottom="space40">
          <Text as="span" color="colorTextWeak" fontSize="fontSize20">
            {note.creator}{note.year ? `, ${note.year}` : ''}
          </Text>
        </Box>
      )}
    </>
  );

  return (
    <Box
      as="article"
      paddingTop="space80"
      paddingBottom="space80"
      borderTopWidth="borderWidth10"
      borderTopStyle="solid"
      borderTopColor="colorBorderSubtle"
    >
      {/* Mobile layout */}
      <Box display={['block', 'block', 'none']}>
        <Box marginBottom="space40">{dateText}</Box>
        {isLog && note.cover ? (
          <Box display="flex" columnGap="space60" marginBottom="space50" alignItems="flex-start">
            <CoverImage note={note} />
            <Box minWidth="size0">{titleMeta}</Box>
          </Box>
        ) : (
          <Box marginBottom="space50">{titleMeta}</Box>
        )}
        <NoteBody note={note} isThought={isThought} />
      </Box>

      {/* Desktop layout */}
      <Box
        display={['none', 'none', 'grid']}
        columnGap="space70"
        style={{ gridTemplateColumns: '150px 152px 1fr', alignItems: 'start' }}
      >
        <Box paddingTop="space20">{dateText}</Box>
        <Box>{isLog && <CoverImage note={note} />}</Box>
        <Box minWidth="size0">
          {titleMeta}
          <NoteBody note={note} isThought={isThought} />
        </Box>
      </Box>
    </Box>
  );
}
