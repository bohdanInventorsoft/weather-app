import React, { useMemo } from 'react'
import { HistoryEntry, useHistory } from '@contexts/HistoryProvider'
import moment from 'moment'
import { BsTrash } from 'react-icons/bs'
import { CiUndo } from 'react-icons/ci'
import { useStateContext } from '@state/store'
import { ActionType } from '@state/actions'
import { AiOutlineClose } from 'react-icons/ai'
import Typo from '@ui/Typo'
import Card from '@ui/Card'

export const HistoryBoard = () => {
  const { history, removedHistory, remove, undoRemove } = useHistory()

  const list = useMemo(() => {
    return [...history, ...removedHistory].sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1
      if (a.timestamp < b.timestamp) return 1
      return 0
    })
  }, [history, removedHistory])

  return (
    <Card variant={'darkgrey'}>
      <table className="w-full table-auto  border border-slate-500 text-xs">
        <thead className={'text-xs leading-0'}>
          <tr className={' border border-[#5c6063]'}>
            <td className={'px-2 border border-grey1'}>City</td>
            <td className={'px-2 border border-grey1'}>Country</td>
            <td className={'px-2 border border-grey1'}>Date</td>
            <td className={'px-2 border border-grey1'}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {list.length ? (
            list.map((h) => {
              return <HistoryItem key={h.id} {...h} />
            })
          ) : (
            <tr>
              <td className={'text-center'} colSpan={4}>
                <Typo variant={'grey'}>No history</Typo>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  )
}

const HistoryItem = ({ city, country, timestamp, id }: HistoryEntry) => {
  const { remove, undoRemove, removedHistory, finaleRemove } = useHistory()
  const [, dispatch] = useStateContext((store) => store.selectedCity)
  const isRemoved = removedHistory.findIndex((h) => h.id === id) > -1
  const selectCity = () => {
    dispatch({ type: ActionType.SELECT_CITY, payload: { country, name: city } })
  }

  const handleUndoRemove = (e: any) => {
    e.stopPropagation()
    undoRemove(id)
  }

  const handleRemove = (e: any) => {
    e.stopPropagation()
    remove(id)
  }

  const handleFinaleRemove = (e: any) => {
    e.stopPropagation()
    finaleRemove(id)
  }

  return (
    <tr className={'cursor-pointer'} onClick={selectCity}>
      <td className={'px-2 border border-grey1'}>{city}</td>
      <td className={'px-2 border border-grey1'}>{country}</td>
      <td className={'px-2 border border-grey1'}>{moment(timestamp).format('MM/DD hh:mm')}</td>
      <td className={'px-2 border border-grey1'}>
        {!isRemoved ? <BsTrash onClick={handleRemove} className={'mx-auto text-base cursor-pointer'} /> : null}
        {isRemoved ? (
          <div className={'flex'}>
            <CiUndo onClick={handleUndoRemove} className={'mx-auto text-base cursor-pointer'} />
            <AiOutlineClose onClick={handleFinaleRemove} className={'mx-auto text-base cursor-pointer'} />
          </div>
        ) : null}
      </td>
    </tr>
  )
}
